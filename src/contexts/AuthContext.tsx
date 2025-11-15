import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthenticationResponse } from '../features/authentication/models/AuthenticationResponse'

interface AuthContextType {
  currentUser: AuthenticationResponse | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<AuthenticationResponse | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const email = localStorage.getItem('email')
    
    if (token && username && userId) {
      setCurrentUser({
        token,
        username,
        userId: parseInt(userId),
        email: email || '',
        httpStatusCode: 200,
        timestamp: new Date().toISOString(),
        message: 'Authenticated',
        refreshToken: localStorage.getItem('refreshToken') || '',
        refreshTokenExpiration: localStorage.getItem('refreshTokenExpiration') || '',
        expiration: localStorage.getItem('tokenExpiration') || '',
      })
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { authService } = await import('../services/authService')
    const data = await authService.login({ email, password })
    saveTokens(data)
    setCurrentUser(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('refreshTokenExpiration')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    setCurrentUser(null)
  }

  const saveTokens = (data: AuthenticationResponse) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('tokenExpiration', data.expiration)
    localStorage.setItem('refreshTokenExpiration', data.refreshTokenExpiration)
    localStorage.setItem('username', data.username)
    localStorage.setItem('userId', data.userId.toString())
    localStorage.setItem('email', data.email)
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem('token')
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

