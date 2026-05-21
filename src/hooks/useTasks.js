import { useEffect, useMemo, useState } from 'react'
import { deleteTaskRecord, loadTasks, saveTasks, updateTaskRecord, createTaskRecord } from '../services/taskService'
import { STATUS_FILTERS } from '../utils/constants'

const getTaskStats = (tasks) => ({
  total: tasks.length,
  inProgress: tasks.filter((task) => task.status === 'In Progress').length,
  completed: tasks.filter((task) => task.status === 'Completed').length,
  hold: tasks.filter((task) => task.status === 'Hold').length,
})

const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    loadTasks()
      .then((storedTasks) => {
        if (active) {
          setTasks(storedTasks)
        }
      })
      .catch(() => {
        if (active) {
          setTasks([])
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = [task.name, task.assignedTo, String(task.id)]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === STATUS_FILTERS[0] || task.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [tasks, searchTerm, statusFilter])

  const stats = useMemo(() => getTaskStats(tasks), [tasks])

  const createTask = async (task) => {
    const nextTask = await createTaskRecord(task)
    const nextTasks = [nextTask, ...tasks]
    setTasks(nextTasks)
    await saveTasks(nextTasks)
  }

  const updateTask = async (taskId, updates) => {
    const nextTasks = await updateTaskRecord(taskId, updates)
    setTasks(nextTasks)
  }

  const deleteTask = async (taskId) => {
    const nextTasks = await deleteTaskRecord(taskId)
    setTasks(nextTasks)
  }

  return {
    tasks,
    filteredTasks,
    stats,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    createTask,
    updateTask,
    deleteTask,
  }
}

export default useTasks