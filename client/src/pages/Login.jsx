import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { setAuthCredentials } from '../utils/auth'
import { useState } from 'react'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await customFetch.post('/auth/login', data)
    setAuthCredentials(response.data.token)
    toast.success('Logged in successfully')
    return redirect('/')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}

const Login = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loginDemoUser = async () => {
    setIsSubmitting(true)
    const data = {
      email: 'test@test.com',
      password: 'secret',
    }
    try {
      const response = await customFetch.post('/auth/login', data)
      setAuthCredentials(response.data.token)
      toast.success('Take a test drive...')
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section className="grid h-screen place-items-center">
      <div className="flex flex-col gap-y-2">
        <div className="text-center">
          <h4 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome back!
          </h4>
          <p className="mt-3 text-secondary text-sm">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="link link-primary link-hover font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
        <Form
          method="POST"
          className="mt-3 card w-[24rem] md:w-[28rem] p-8 md:p-10 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <FormInput type="email" label="email" name="email" required />
          <FormInput
            type="password"
            label="password"
            name="password"
            required
          />
          <div className="mt-4">
            <SubmitBtn text="sign in" />
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-block uppercase"
            onClick={loginDemoUser}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner uppercase">
                loading...
              </span>
            ) : (
              'guest user'
            )}
          </button>
        </Form>
      </div>
    </section>
  )
}
export default Login
