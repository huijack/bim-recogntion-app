import { useRef } from 'react'
import {
  DateChoose,
  FormInput,
  FormTextArea,
  ModalBtn,
  SectionTitle,
} from '../components'
import { Form } from 'react-router-dom'

const Profile = () => {
  const formRef = useRef(null)

  const confirmUpdate = () => {
    console.log('Profile updated successfully')
    formRef.current.submit()
  }

  return (
    <>
      <SectionTitle text="profile overview" />
      <Form
        className="mt-10 grid gap-y-6 md:gap-y-10"
        method="POST"
        ref={formRef}
      >
        <section className="grid sm:grid-cols-2 gap-6 md:gap-x-20 md:gap-y-10 sm:justify-center md:justify-between">
          <FormInput
            label="your name"
            name="name"
            type="text"
            defaultValue="John Doe"
          />
          <FormInput
            label="email"
            name="email"
            type="email"
            defaultValue="test@test.com"
          />
          <FormInput
            label="password"
            name="password"
            type="password"
            defaultValue="testing"
          />
          <DateChoose label="Date of Birth" name="date" />
        </section>
        <FormTextArea label="additional notes" name="notes" />
        <div className="flex justify-end">
          <label
            htmlFor="open-modal"
            className="btn btn-primary font-semibold uppercase"
          >
            edit profile
          </label>
        </div>
      </Form>
      <ModalBtn confirmUpdate={confirmUpdate} />
    </>
  )
}
export default Profile
