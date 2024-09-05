import { useRouteError, Link } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <main className="grid place-items-center min-h-screen px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl capitalize tracking-tight sm:text-5xl font-bold">
            page not found
          </h1>
          <h3 className="mt-6 text-lg leading-7">
            Sorry, we couldn’t find the page you’re looking for :(
          </h3>
          <div className="mt-8">
            <Link to="/" className="btn btn-secondary uppercase font-bold">
              back to home
            </Link>
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className="grid place-items-center min-h-screen px-8">
      <h4 className="text-center font-bold text-primary capitalize text-4xl">
        there was an error...
      </h4>
    </main>
  )
}
export default Error
