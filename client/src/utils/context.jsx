import { createContext, useState, useContext, useEffect } from 'react'
import LogoBlack from '../assets/LogoBlack.svg'
import LogoWhite from '../assets/LogoWhite.svg'

const ThemeContext = createContext()

export const themes = {
  lemonade: 'lemonade',
  dim: 'dim',
}

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.lemonade
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage())

  const toggleTheme = () => {
    const { lemonade, dim } = themes
    const newTheme = theme === lemonade ? dim : lemonade
    setTheme(newTheme)
  }

  const changeLogo = () => {
    return theme === themes.lemonade ? LogoBlack : LogoWhite
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeLogo }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
