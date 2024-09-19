export const setAuthCredentials = (token) => {
  localStorage.setItem('token', token)
}

export const clearAuthCredentials = () => {
  localStorage.removeItem('token')
}

export const getToken = () => {
  return localStorage.getItem('token')
}
