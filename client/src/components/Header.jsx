import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        <div className="flex gap-x-6 justify-center items-center">
          {/* USER */}
          {user ? (
            <div className="flex gap-x-2 sm:gap-x-8 items-center">
              <p className="text-xs sm:text-sm">Hello, {user.username}</p>
              <button
                className="btn btn-xs btn-outline btn-primary uppercase"
                onClick={logout}
              >
                logout
              </button>
            </div>
          ) : (
            /* LINKS */
            <div className="flex gap-x-6 justify-center items-center">
              <Link to="/login" className="link link-hover text-xs sm:text-sm">
                Sign in / Guest
              </Link>
              <Link
                to="/register"
                className="link link-hover text-xs sm:text-sm"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
