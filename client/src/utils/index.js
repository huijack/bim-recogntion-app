import axios from 'axios'

const serverUrl = 'http://localhost:3000/api/v1'

export const customFetch = axios.create({
  baseURL: serverUrl,
})
