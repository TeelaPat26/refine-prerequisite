export type AuthenticateResponseDto = {
  status: number
  data: {
    accessToken: string
    refreshToken: string
    user: {
      userId: string
      username: string
      role: string
    }
  }
}
