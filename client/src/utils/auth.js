export const setAuthCredentials = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
}

export const clearAuthCredentials = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

export const getUser = () => {
  const userString = localStorage.getItem('user')
  return userString ? JSON.parse(userString) : null
}

export const getToken = () => {
  return localStorage.getItem('token')
}
