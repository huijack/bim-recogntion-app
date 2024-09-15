import { Form, Link, useActionData, useNavigate } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { useAuth } from '../utils/AuthContext'
import { useEffect } from 'react'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const response = await customFetch.post('/auth/login', data)
    toast.success('Logged in successfully')
    return {
      success: true,
      user: response.data.user,
      token: response.data.token,
    }
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.msg,
    }
  }
}

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const actionData = useActionData()

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        login(actionData.user, actionData.token)
        navigate('/')
      } else {
        toast.error(actionData.error)
      }
    }
  }, [actionData, login, navigate])

  return (
    <section className="grid h-screen place-items-center">
      <div className="flex flex-col gap-y-2">
        <div className="text-center">
          <h4 className="text-4xl font-bold text-primary">Welcome back!</h4>
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
          className="mt-3 card w-[28rem] p-10 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <FormInput type="email" label="email" name="email" />
          <FormInput type="password" label="password" name="password" />
          <div className="mt-4">
            <SubmitBtn text="sign in" />
          </div>
        </Form>
      </div>
    </section>
  )
}
export default Login
