import { Form, redirect, useNavigate, useLocation } from 'react-router-dom'
import { FormInput, Loading, SectionTitle, WebCam } from '../components'
import { useState, useEffect } from 'react'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { useAuth } from '../utils/AuthContext'

const URL = '/sessions'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post(URL, data)
    toast.success('Session created successfully')
    return redirect(`/session/${response.data.session._id}`)
  } catch (error) {
    const errorMessage = error?.response?.data?.msg
    toast.error(errorMessage)
    return redirect('/session')
  }
}

const Session = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(null)
  const { token, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!isLoading && !token && !shouldRedirect) {
      const from = location.pathname
      if (from !== '/login') {
        toast.warn('You need to login to create a session')
        setShouldRedirect(true)
      }
    }
  }, [token, isLoading, location, shouldRedirect])

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/login', { state: { from: location }, replace: true })
    }
  }, [shouldRedirect, navigate, location])

  if (isLoading) {
    return <Loading />
  }

  if (!token) {
    return null
  }

  return (
    <>
      <SectionTitle text="new session" />
      <section className="my-10 grid md:grid-cols-2 gap-4 md:gap-x-12">
        <WebCam
          isPermissionGranted={isPermissionGranted}
          setIsPermissionGranted={setIsPermissionGranted}
        />
        <Form method="POST">
          <div className="flex flex-col gap-y-10">
            <FormInput label="session name" name="name" type="text" />
            <button
              type="submit"
              className="btn btn-primary uppercase font-semibold"
              disabled={isPermissionGranted !== true}
            >
              {isPermissionGranted === true
                ? 'create session'
                : 'camera permission required'}
            </button>
          </div>
        </Form>
      </section>
    </>
  )
}
export default Session
