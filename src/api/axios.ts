import { getRefreshToken, saveRefreshToken } from "../storage"
import { getAccessToken, saveAccessToken } from "../storage/access-token-storage"
import axios from 'axios'
import { refreshToken } from "./auth"

// const baseUrl = import.meta.env.VITE_API_URL
// TODO: replace this with VITE env
const baseUrl = ""

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async config => {
    const accessTokenValue = getAccessToken()
    if (accessTokenValue) {
      config.headers.Authorization = 'Bearer ' + accessTokenValue
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config
    if (error.response?.status === 401) {
      if (!originalRequest._retry || originalRequest._retry < 3) {
        originalRequest._retry = originalRequest._retry
          ? originalRequest._retry + 1
          : 1

        const accessTokenValue = getAccessToken()
        const refreshTokenValue = getRefreshToken()

        if (!refreshTokenValue || !accessTokenValue) {
          // store.dispatch(revokeTokenAction())
          console.log('No refresh token or access token')
          return Promise.reject(error)
        }

        // refresh token
        try {
          const response = await refreshToken({
            accessToken: accessTokenValue,
            refreshToken: refreshTokenValue,
          })

          // use new access and refresh token
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.accessToken}`
          // store.dispatch(authAction(response))
          saveAccessToken(response.accessToken)
          saveRefreshToken(response.refreshToken)
        } catch (e) {
          // ignore
        }
        // resend original request
        return axiosInstance(originalRequest)
      } else {
        // still got 401 after retry, the refresh token is no longer valid.
        // store.dispatch(revokeTokenAction())
        console.log('Refresh token is no longer valid')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)
