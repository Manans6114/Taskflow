import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth()

  if (!hydrated) {
    return null
  }

  if (!user) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute