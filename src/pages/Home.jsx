import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/Home.css'

import useTasks from '../hooks/useTasks'

import TaskStats from '../components/TaskStats'
import SearchBar from '../components/SearchBar'
import StatusFilter from '../components/StatusFilter'
import TaskCard from '../components/TaskCard'
import Loader from '../components/Loader'

import { STATUS_FILTERS } from '../utils/constants'

import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

function Home() {
  const { user } = useAuth()

  const {
    filteredTasks,
    stats,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateTask,
    deleteTask
  } = useTasks()

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    status: '',
    assignedTo: '',
  })

  const handleEdit = (task) => {
    setEditingTaskId(task.id)
    setEditForm({
      name: task.name,
      status: task.status,
      assignedTo: task.assignedTo,
    })
  }

  const handleEditChange = (event) => {
    setEditForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleCancelEdit = () => {
    setEditingTaskId(null)
    setEditForm({
      name: '',
      status: '',
      assignedTo: '',
    })
  }

  const handleSaveEdit = async (taskId) => {
    await updateTask(taskId, editForm)
    handleCancelEdit()
  }

  return (
    <>
      <Navbar />

      <div className='page-shell home-page'>
        <section className='hero-panel glass-panel'>
          <h1>
            Welcome, <span>{user?.name || 'Deepak Kumar'}</span> 👋
          </h1>

          <p>to Task Manager</p>
        </section>

        {loading ? (
          <Loader />
        ) : (
          <>
            <TaskStats stats={stats} />

            <section className='toolbar-row'>
              <div className='toolbar-search'>
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>

              <div className='toolbar-filter'>
                <StatusFilter
                  value={statusFilter}
                  options={STATUS_FILTERS}
                  onChange={setStatusFilter}
                />
              </div>
            </section>

            <div className='results-note'>
              Showing {filteredTasks.length} of {stats.total} tasks
            </div>

            <section className='task-grid'>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isEditing={editingTaskId === task.id}
                  editForm={editForm}
                  onEditChange={handleEditChange}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={handleCancelEdit}
                  onEdit={handleEdit}
                  onDelete={deleteTask}
                />
              ))}
            </section>
          </>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Home