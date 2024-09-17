import { Navigate, useRouteError } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const ErrorElement = () => {
  const error = useRouteError()
  const { user, token } = useAuth()

  useEffect(() => {
    if (!user && !token) {
      toast.warn('Please login to access the full site')
    }
  }, [user, token])

  if (!user && !token) {
    return <Navigate to="/login" replace />
  }

  console.log(error)

  return (
    <>
      <h4 className="font-bold text-4xl capitalize">there was an error...</h4>
    </>
  )
}
export default ErrorElement
