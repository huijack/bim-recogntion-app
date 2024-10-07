import { Form, Link, redirect } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration successful')
    return redirect('/login')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  return (
    <section className="grid h-screen place-items-center">
      <div className="flex flex-col gap-y-2">
        <div className="text-center">
          <h4 className="text-3xl md:text-4xl font-bold text-primary">
            Create your account here!
          </h4>
          <p className="mt-3 text-secondary text-sm">
            Get started with a registered account
          </p>
        </div>
        <Form
          method="POST"
          className="mt-3 card w-[22rem] mx-3 md:mx-0 md:w-[28rem] p-8 md:p-10 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <FormInput type="text" label="username" name="username" required />
          <FormInput type="email" label="email" name="email" required />
          <FormInput
            type="password"
            label="password"
            name="password"
            required
          />
          <div className="-mt-1 form-control">
            <label className="label cursor-pointer justify-normal gap-x-4">
              <input type="checkbox" className="checkbox" required />
              <span className="label-text">I accept terms and conditions</span>
            </label>
          </div>
          <div className="mt-2">
            <SubmitBtn text="register" />
          </div>
          <div className="mt-1 text-center">
            <p className="text-sm capitalize">
              Already have an account?{' '}
              <Link
                to="/login"
                className="link font-semibold link-secondary link-hover"
              >
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </section>
  )
}
export default Register
