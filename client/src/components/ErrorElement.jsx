import {
  Navigate,
  useRouteError,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const ErrorElement = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  const location = useLocation()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  console.log(error)

  return (
    <>
      <h4 className="font-bold text-4xl capitalize">there was an error...</h4>
    </>
  )
}

export default ErrorElement
