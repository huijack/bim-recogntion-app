import { NavLink } from 'react-router-dom'

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
    url: 'history',
    text: 'history',
  },
  {
    id: 4,
    url: 'profile',
    text: 'profile',
  },
]

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link
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
