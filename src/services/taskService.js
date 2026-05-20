import { DEMO_TASKS, TASK_STORAGE_KEY } from '../utils/constants'

const readStorage = () => {
  if (typeof window === 'undefined') {
    return DEMO_TASKS
  }

  const storedValue = window.localStorage.getItem(TASK_STORAGE_KEY)

  if (!storedValue) {
    window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(DEMO_TASKS))
    return DEMO_TASKS
  }

  try {
    const parsedValue = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue : DEMO_TASKS
  } catch {
    return DEMO_TASKS
  }
}

const writeStorage = (tasks) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
  }
}

export const loadTasks = async () => readStorage()

export const saveTasks = async (tasks) => {
  writeStorage(tasks)
  return tasks
}

export const createTaskRecord = async (task) => {
  const tasks = readStorage()
  const nextTask = {
    ...task,
    id: tasks.reduce((maxId, currentTask) => Math.max(maxId, currentTask.id), 0) + 1,
  }
  const nextTasks = [nextTask, ...tasks]
  writeStorage(nextTasks)
  return nextTask
}

export const updateTaskRecord = async (taskId, updates) => {
  const tasks = readStorage()
  const nextTasks = tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
  writeStorage(nextTasks)
  return nextTasks
}

export const deleteTaskRecord = async (taskId) => {
  const tasks = readStorage()
  const nextTasks = tasks.filter((task) => task.id !== taskId)
  writeStorage(nextTasks)
  return nextTasks
}