import { TASK_STORAGE_KEY } from '../utils/constants'

const TASK_API_URL = 'https://jsonplaceholder.typicode.com/todos'

const normalizeTask = (todo) => ({
  id: todo.id,
  name: todo.title,
  status: todo.completed ? 'Completed' : 'In Progress',
  assignedTo: `User ${todo.userId}`,
})

const readStorage = () => {
  if (typeof window === 'undefined') {
    return []
  }

  const storedValue = window.localStorage.getItem(TASK_STORAGE_KEY)

  if (!storedValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

const writeStorage = (tasks) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
  }
}

export const loadTasks = async () => {
  const storedTasks = readStorage()

  if (storedTasks.length > 0) {
    return storedTasks
  }

  const response = await fetch(TASK_API_URL)

  if (!response.ok) {
    return []
  }

  const todos = await response.json()
  const tasks = Array.isArray(todos) ? todos.map(normalizeTask) : []

  writeStorage(tasks)
  return tasks
}

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