import { Form } from 'react-router-dom'
import { FormInput, SectionTitle, WebCam } from '../components'
import { useState } from 'react'

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
            <FormInput label="session name" name="session-name" type="text" />
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
