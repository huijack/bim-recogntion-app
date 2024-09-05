import { Form, Link } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'

const Login = () => {
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
          <FormInput
            type="email"
            label="email"
            name="identifier"
            defaultValue="test@test.com"
          />
          <FormInput
            type="password"
            label="password"
            name="password"
            defaultValue="secret"
          />

          <div className="mt-4">
            <SubmitBtn text="sign in" />
          </div>
        </Form>
      </div>
    </section>
  )
}
export default Login
