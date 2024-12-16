import { axiosInstance } from './axios'
import {
  AuthenticateRequestDto,
  AuthenticateResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  UserResponseDto,
} from './dto'

export async function authenticate(
  request: AuthenticateRequestDto
): Promise<AuthenticateResponseDto> {
  const response = await axiosInstance.post('Auth/Authenticate', request)
  const { accessToken, refreshToken } = response.data
  if (!accessToken || !refreshToken) {
    throw new Error(response.data.title)
  }
  return { status: response.status, data: response.data }
}
export async function refreshToken(
  request: RefreshTokenRequestDto
): Promise<RefreshTokenResponseDto> {
  const response = await axiosInstance.post('Auth/RefreshToken', request)
  return response.data
}

export async function getCurrentUser(): Promise<UserResponseDto> {
  const response = await axiosInstance.get('/Auth')
  return response.data
}

// export function authenticate() {
//     return Promise.resolve({
//         status: 200,
//         data: {
//             accessToken: 'accessToken',
//             refreshToken: 'refreshToken',
//         }
//     })
// }

// export function getCurrentUser() {
//     return Promise.resolve({
//         status: 200,
//         data: {
//             userId: 'userId',
//             username: 'username',
//             role: 'role',
//         }
//     })
// }

// export async function refreshToken(request: RefreshTokenRequestDto) {
//     return Promise.resolve({
//         status: 200,
//         data: {
//             accessToken: 'accessToken',
//             refreshToken: 'refreshToken',
//         }
//     })
// }
