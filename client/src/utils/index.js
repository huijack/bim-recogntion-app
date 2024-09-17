import axios from 'axios'
import { getToken } from './auth'

const serverUrl = 'http://localhost:3000/api/v1'

export const customFetch = axios.create({
  baseURL: serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

customFetch.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
