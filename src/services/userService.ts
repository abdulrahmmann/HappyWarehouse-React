import api from './api'
import { UserModel } from '../features/users/models/User'

interface UsersResponse {
  totalCount: number
  httpStatusCode: number
  email: string | null
  message: string
  timestamp: string
  data: UserModel[]
}

export const userService = {
  getAllUsers: async (): Promise<UserModel[]> => {
    const response = await api.get<UsersResponse>('/v1/Users/all')
    return response.data.data || []
  },
}

