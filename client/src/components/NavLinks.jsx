import { NavLink } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

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
    protected: true,
  },
  {
    id: 3,
    url: 'history',
    text: 'history',
    protected: true,
  },
  {
    id: 4,
    url: 'profile',
    text: 'profile',
    protected: true,
  },
]

const NavLinks = () => {
  const { user } = useAuth()
  return (
    <>
      {links.map((link) => {
        const { id, url, text, protected: isProtected } = link

        if (isProtected && !user) return null

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
