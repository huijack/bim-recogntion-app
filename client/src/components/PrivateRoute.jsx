import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { toast } from 'react-toastify'

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    toast.warn('Please login to access the full site')
    return <Navigate to="/login" replace />
  }

  return children
}
export default PrivateRoute
