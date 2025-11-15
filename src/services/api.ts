import axios from 'axios'

const BASE_URL = import.meta.env.DEV ? '/api' : 'https://localhost:7018/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Log error details for debugging
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
      })
      console.error('Error Response Data:', error.response.data)
      // Log full error object for detailed debugging
      if (error.response.data) {
        console.error('Error Details:', JSON.stringify(error.response.data, null, 2))
      }
    } else if (error.request) {
      console.error('API Request Error:', {
        message: 'No response received from server',
        url: error.config?.url,
      })
    } else {
      console.error('API Error:', error.message)
    }

    if (error.response?.status === 401) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('refreshToken')
      const token = localStorage.getItem('token')
      
      if (refreshToken && token) {
        try {
          const response = await axios.post(
            `${BASE_URL}/v1/Users/generate-new-access-token`,
            { token, refreshToken }
          )
          const { token: newToken, refreshToken: newRefreshToken, expiration } = response.data
          localStorage.setItem('token', newToken)
          localStorage.setItem('refreshToken', newRefreshToken)
          localStorage.setItem('tokenExpiration', expiration)
          
          // Retry original request
          error.config.headers.Authorization = `Bearer ${newToken}`
          return axios(error.config)
        } catch (refreshError) {
          // Refresh failed, logout
          localStorage.clear()
          window.location.href = '/auth/login'
        }
      } else {
        localStorage.clear()
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

