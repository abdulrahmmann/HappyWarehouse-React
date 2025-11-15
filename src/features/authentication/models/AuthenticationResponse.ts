export interface AuthenticationResponse {
  httpStatusCode: number
  timestamp: string
  message: string
  errors?: string[]
  userId: number
  username: string
  email: string
  token: string
  refreshToken: string
  refreshTokenExpiration: string
  expiration: string
}

