import api from './api'
import { AuthenticationResponse } from '../features/authentication/models/AuthenticationResponse'
import { LoginUser } from '../features/authentication/models/LoginUser'

export const authService = {
  login: async (loginUser: LoginUser): Promise<AuthenticationResponse> => {
    const response = await api.post<AuthenticationResponse>(
      '/v1/Users/login',
      loginUser
    )
    return response.data
  },

  refreshToken: async (): Promise<AuthenticationResponse> => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    
    const response = await api.post<AuthenticationResponse>(
      '/v1/Users/generate-new-access-token',
      { token, refreshToken }
    )
    return response.data
  },
}

