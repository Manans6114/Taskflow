import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { APP_NAME } from '../utils/constants'
import { useAuth } from '../context/AuthContext'

function HexagonLogo() {
  return (
    <svg width='24' height='24' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20 2L34.64 11V29L20 38L5.36 29V11L20 2Z' stroke='#6f63ff' strokeWidth='1.5' fill='none' />
    </svg>
  )
}

function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <nav className='navbar'>
      <Link to='/home' className='brand-link'>
        <span className='brand-mark'>
          <HexagonLogo />
        </span>
        <h2>{APP_NAME}</h2>
      </Link>

      <div className='nav-links'>
        <Link to='/home' className='nav-link'>
          🏠 Home
        </Link>
        <Link to='/add-task' className='nav-link nav-link-accent'>
          + Add Task
        </Link>
      </div>

      <div className='nav-user-area'>
        <span className='user-chip'>
          <FaUserAlt />
          {user?.name || 'Deepak Kumar'}
        </span>
        <button type='button' className='logout-button' onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar