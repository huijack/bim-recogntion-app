import { Form, redirect } from 'react-router-dom'
import { FormInput, SectionTitle, WebCam } from '../components'
import { useState } from 'react'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

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
