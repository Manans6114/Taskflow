import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/AddTask.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import useTasks from '../hooks/useTasks'
import { STATUS_OPTIONS } from '../utils/constants'
import { useAuth } from '../context/AuthContext'

function AddTask() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { tasks, createTask, updateTask } = useTasks()
  const editingTask = location.state?.task || null
  const nextTaskId = useMemo(() => (tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1), [tasks])
  const [formData, setFormData] = useState({
    name: editingTask?.name || '',
    status: editingTask?.status || '',
    assignedTo: editingTask?.assignedTo || '',
  })

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (editingTask) {
      await updateTask(editingTask.id, {
        name: formData.name,
        status: formData.status,
        assignedTo: formData.assignedTo,
      })
    } else {
      await createTask({
        name: formData.name,
        status: formData.status,
        assignedTo: formData.assignedTo,
      })
    }

    navigate('/home')
  }

  return (
    <>
      <Navbar />
      <div className='page-shell add-page'>
        <div className='add-card glass-panel'>
          <h1>{editingTask ? 'Edit Task' : 'Add New Task'}</h1>
          <p className='add-subtitle'>Fill in the details to create a new task</p>

          <form className='task-form' onSubmit={handleSubmit}>
            <label>
              <span>TASK NAME *</span>
              <input name='name' value={formData.name} onChange={handleChange} placeholder='Describe the task...' />
            </label>

            <label>
              <span>STATUS *</span>
              <select name='status' value={formData.status} onChange={handleChange}>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              <span>ASSIGN TO *</span>
              <input name='assignedTo' value={formData.assignedTo} onChange={handleChange} placeholder="Enter team member's name" />
            </label>

            <div className='task-id-note'>Task ID will be: <strong>#{editingTask?.id || nextTaskId}</strong></div>

            <div className='form-actions'>
              <button type='submit' className='primary-button'>
                {editingTask ? '✓ Save' : '+ Add Task'}
              </button>
              <button type='button' className='secondary-button' onClick={() => navigate('/home')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddTask