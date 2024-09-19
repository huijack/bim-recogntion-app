import {
  Navigate,
  useRouteError,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const ErrorElement = () => {
  const error = useRouteError()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!user && !token && !shouldRedirect) {
      const from = location.state?.from?.pathname || '/'
      if (from !== '/login') {
        toast.warn('Please login to access the full site')
        setShouldRedirect(true)
      }
    }
  }, [user, token, location, shouldRedirect])

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [shouldRedirect, navigate, location])

  if (error.status === 401) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (shouldRedirect) {
    return null
  }

  return (
    <>
      <h4 className="font-bold text-4xl capitalize">there was an error...</h4>
    </>
  )
}

export default ErrorElement
