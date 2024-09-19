import {
  DateChoose,
  FormInput,
  FormTextArea,
  ModalBtn,
  SectionTitle,
} from '../components'
import { Form, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'

const URL = '/profile'

export const loader = async () => {
  const response = await customFetch(URL)
  const data = response.data
  const { additionalNotes, dateOfBirth, email, username } = data.user
  return { additionalNotes, dateOfBirth, email, username }
}

const Profile = () => {
  const { additionalNotes, dateOfBirth, email, username } = useLoaderData()

  return (
    <>
      <SectionTitle text="profile overview" />
      <Form className="mt-10 grid gap-y-6 md:gap-y-10" method="PATCH">
        <section className="grid sm:grid-cols-3 gap-6 md:gap-x-20 md:gap-y-10 sm:justify-center md:justify-between">
          {/* PROFILE INFORMATION */}
          <FormInput
            label="your name"
            name="username"
            type="text"
            defaultValue={username}
          />
          <FormInput
            label="email"
            name="email"
            type="email"
            defaultValue={email}
          />
          <DateChoose
            label="Date of Birth"
            name="dateOfBirth"
            selectedDate={dateOfBirth}
          />
        </section>
        <FormTextArea
          label="additional notes"
          name="additionalNotes"
          defaultValue={additionalNotes}
        />
        <div className="flex justify-end">
          <label
            htmlFor="open-modal"
            className="btn btn-primary font-semibold uppercase"
          >
            edit profile
          </label>
        </div>
        <ModalBtn />
      </Form>
    </>
  )
}
export default Profile
