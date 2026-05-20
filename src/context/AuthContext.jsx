import { createContext, useContext, useEffect, useState } from 'react'
import { AUTH_STORAGE_KEY } from '../utils/constants'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  hydrated: false,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }

    setHydrated(true)
  }, [])

  const login = (data) => {
    setUser(data)
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)