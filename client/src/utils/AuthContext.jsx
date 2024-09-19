import { createContext, useContext, useState, useEffect } from 'react'
import { getToken, setAuthCredentials, clearAuthCredentials } from './auth'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const initializeAuth = () => {
    const storedToken = getToken()
    if (storedToken) {
      setToken(storedToken)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    initializeAuth()
  }, [])

  const login = (token) => {
    setToken(token)
    setAuthCredentials(token)
  }

  const logout = () => {
    setToken(null)
    clearAuthCredentials()
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
