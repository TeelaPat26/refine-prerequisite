import { clearAccessToken, saveAccessToken, getAccessToken } from "../storage/access-token-storage"
import { clearGeneratedUlid, saveGeneratedUlid, getGeneratedUlid } from "../storage/generated-ulid-storage"
import { clearRefreshToken, saveRefreshToken, getRefreshToken } from "../storage/refresh-token-storage"
import { ulid } from "ulid"
import type { AuthProvider } from '@refinedev/core'
import { authenticate, getCurrentUser } from "../api/auth"

const logout = async () => {
  clearAccessToken()
  clearRefreshToken()
  clearGeneratedUlid()
  return {
    success: true,
    redirectTo: '/login',
  }
}

export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    clearAccessToken()
    clearRefreshToken()
    clearGeneratedUlid()

    if ((username || email) && password) {
      const response = await authenticate()

      // on success
      if (response.status === 200) {
        saveAccessToken(response.data.accessToken)
        saveRefreshToken(response.data.refreshToken)
        saveGeneratedUlid(ulid())

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
    const generatedUlid = getGeneratedUlid()

    if (!generatedUlid) {
      saveGeneratedUlid(ulid())
    }

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
        id: response.data.userId,
        name: response.data.username,
        role: response.data.role,
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
