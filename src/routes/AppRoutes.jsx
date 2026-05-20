import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/Login'
import Home from '../pages/Home'
import AddTask from '../pages/AddTask'
import ProtectedRoute from '../components/ProtectedRoute'

function AppRoutes() {
  const { user, hydrated } = useAuth()

  if (!hydrated) {
    return null
  }

  return (
    <Routes>
      <Route path='/' element={user ? <Navigate to='/home' replace /> : <Login />} />
      <Route
        path='/home'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path='/add-task'
        element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to={user ? '/home' : '/'} replace />} />
    </Routes>
  )
}

export default AppRoutes