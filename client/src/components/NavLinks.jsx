import { NavLink } from 'react-router-dom'
import { getToken } from '../utils/auth'

const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: 'session',
    text: 'session',
  },
  {
    id: 3,
    url: 'alphabets',
    text: 'alphabets',
  },
  {
    id: 4,
    url: 'history',
    text: 'history',
    protected: true,
  },
  {
    id: 5,
    url: 'profile',
    text: 'profile',
    protected: true,
  },
  {
    id: 6,
    url: 'change-password',
    text: 'change password',
    protected: true,
  },
]

const NavLinks = () => {
  const token = getToken()
  return (
    <>
      {links.map((link) => {
        const { id, url, text, protected: isProtected } = link

        if (isProtected && !token) return null

        return (
          <li key={id}>
            <NavLink to={url} className="capitalize">
              {text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}
export default NavLinks
