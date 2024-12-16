export type RefreshTokenResponseDto = {
  accessToken: string
  refreshToken: string
  user: {
    userId: string
    username: string
    role: string
  }
}
