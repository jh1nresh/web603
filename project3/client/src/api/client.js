import axios from 'axios'

// withCredentials makes the browser attach the HTTP-only auth cookie.
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// Every failure reaches the UI in one shape: { message, errors }.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    return Promise.reject({
      status: error.response?.status,
      message: data?.message || 'Network error — is the API running?',
      errors: data?.errors || {},
    })
  }
)

export default api
