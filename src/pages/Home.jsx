import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/Home.css'

import useTasks from '../hooks/useTasks'

import TaskStats from '../components/TaskStats'
import SearchBar from '../components/SearchBar'
import StatusFilter from '../components/StatusFilter'
import TaskCard from '../components/TaskCard'

import { STATUS_FILTERS } from '../utils/constants'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const navigate = useNavigate()

  const { user } = useAuth()

  const {
    filteredTasks,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    deleteTask
  } = useTasks()

  const handleEdit = (task) => {
    navigate('/add-task', {
      state: { task }
    })
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
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))}
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Home