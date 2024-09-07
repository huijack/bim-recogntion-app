import { Link } from 'react-router-dom'
import { useTheme } from '../context'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const { changeLogo } = useTheme()
  const currentLogo = changeLogo()
  return (
    <>
      <footer className="footer bg-base-200 text-base-content py-12 lg:px-40 px-10 md:px-24 mx-auto">
        <aside>
          <img src={currentLogo} className="w-32" />
          <p>
            Your personal automated AI <br />
            sign language translator
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Session</h6>
          <Link to="session" className="link link-hover">
            Create a Session
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">History</h6>
          <Link to="history" className="link link-hover">
            View Past Sessions
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Profile</h6>
          <Link to="profile" className="link link-hover">
            View Profile
          </Link>
          <Link to="profile" className="link link-hover">
            Edit Profile
          </Link>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t py-4 lg:px-40 px-10 md:px-24 items-center">
        <aside className="grid-flow-row items-center">
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            SignMana
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <div className="flex gap-3 text-2xl  ">
              <a
                href="#"
                className="hover:text-secondary transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition duration-300"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </nav>
      </footer>
    </>
  )
}
export default Footer
