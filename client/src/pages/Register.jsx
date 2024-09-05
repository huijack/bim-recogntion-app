import { Form, Link } from 'react-router-dom'
import { FormInput, SubmitBtn } from '../components'

const Register = () => {
  return (
    <section className="grid h-screen place-items-center">
      <div className="flex flex-col gap-y-2">
        <div className="text-center">
          <h4 className="text-4xl font-bold text-primary">
            Create your account here!
          </h4>
          <p className="mt-3 text-secondary text-sm">
            Get started with a registered account
          </p>
        </div>
        <Form
          method="POST"
          className="mt-3 card w-[28rem] p-10 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <FormInput type="text" label="username" name="username" />
          <FormInput type="email" label="email" name="identifier" />
          <FormInput type="password" label="password" name="password" />
          <div className="-mt-1 form-control">
            <label className="label cursor-pointer justify-normal gap-x-4">
              <input type="checkbox" className="checkbox" />
              <span className="label-text">I accept terms and conditions</span>
            </label>
          </div>
          <div className="mt-2">
            <SubmitBtn text="register" />
          </div>
          <div className="mt-1 text-center">
            <p className="text-sm capitalize">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-secondary">
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
