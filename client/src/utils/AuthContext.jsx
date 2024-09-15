import { createContext, useContext, useState, useEffect } from 'react'
import {
  getUser,
  getToken,
  setAuthCredentials,
  clearAuthCredentials,
} from './auth'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedUser = getUser()
    const storedToken = getToken()
    if (storedUser && storedToken) {
      setUser(storedUser)
      setToken(storedToken)
    }
  }, [])

  const login = (user, token) => {
    setUser(user)
    setToken(token)
    setAuthCredentials(user, token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearAuthCredentials()
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
