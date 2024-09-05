import { TbMoon, TbSun } from 'react-icons/tb'
import { HiMenuAlt1 } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import LogoBlack from '../assets/LogoBlack.svg'
import NavLinks from './NavLinks'
import { useTheme, themes } from '../context'

const Navbar = () => {
  const { theme, toggleTheme, changeLogo } = useTheme()
  const currentLogo = changeLogo()

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink to="/" className="hidden lg:flex items-center">
            <img src={currentLogo} alt="SignMana" className="w-40" />
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle lg:hidden">
              <HiMenuAlt1 className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME ICONS */}
          <label className="swap swap-rotate">
            {/* Controls theme state */}
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === themes.dim}
            />

            {/* SUN ICON */}
            <TbSun className="swap-on h-6 w-6" />

            {/* MOON ICON */}
            <TbMoon className="swap-off h-6 w-6" />
          </label>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
