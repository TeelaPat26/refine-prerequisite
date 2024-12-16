import {
  clearAccessToken,
  saveAccessToken,
  getAccessToken,
} from '../storage/access-token-storage'
import {
  clearRefreshToken,
  saveRefreshToken,
  getRefreshToken,
} from '../storage/refresh-token-storage'
import type { AuthProvider } from '@refinedev/core'
import { authenticate, getCurrentUser } from '../../src_copy/api/auth'

const logout = async () => {
  clearAccessToken()
  clearRefreshToken()
  return {
    success: true,
    redirectTo: '/login',
  }
}

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    clearAccessToken()
    clearRefreshToken()

    if ((username || email) && password) {
      const response = await authenticate({
        userId: username || email,
        password,
      })

      // on success
      if (response.status === 200) {
        saveAccessToken(response.data.accessToken)
        saveRefreshToken(response.data.refreshToken)

        return {
          success: true,
          redirectTo: '/',
        }
      }
      // on error
      else {
        return {
          success: false,
          error: {
            name: 'LoginError',
            message: 'Invalid username or password',
          },
        }
      }
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    }
  },
  logout: logout,
  check: async () => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()

    if (accessToken && refreshToken) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const accesstoken = getAccessToken()
    const refreshtoken = getRefreshToken()

    if (accesstoken && refreshtoken) {
      const response = await getCurrentUser()
      return {
        id: response.userId,
        name: response.username,
        role: response.role,
        avatar: 'https://i.pravatar.cc/300',
      }
    }
    return null
  },
  onError: async error => {
    console.error('Auth provider onError:', error)
    const logoutResult = await logout()

    return { redirectTo: logoutResult.redirectTo, logout: true, error }
  },
}
