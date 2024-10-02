import { Form } from 'react-router-dom'
import { FormInput, SectionTitle } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.patch('/users/current-user/update-password', data)
    toast.success('Password updated successfully.')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg || 'Failed to update password.'
    toast.error(errorMessage)
  }
  return null
}

const ChangePassword = () => {
  return (
    <>
      <SectionTitle text="change password" />
      <Form className="mt-10 grid gap-y-6 md:gap-y-10" method="PATCH">
        <section className="grid gap-6 sm:grid-cols-2 md:gap-x-20">
          {/* NEW PASSWORD */}
          <FormInput
            label="new password"
            name="newPassword"
            type="password"
            required
          />
          {/* CONFIRM PASSWORD */}
          <FormInput
            label="confirm password"
            name="confirmPassword"
            type="password"
            required
          />
        </section>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-accent uppercase font-semibold"
          >
            save
          </button>
        </div>
      </Form>
    </>
  )
}
export default ChangePassword
