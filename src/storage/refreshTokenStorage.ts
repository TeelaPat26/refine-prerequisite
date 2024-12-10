export const REFRESH_TOKEN_KEY = 'refresh-token'

const storage = localStorage

export function clearRefreshToken() {
  return storage.removeItem(REFRESH_TOKEN_KEY)
}

export function saveRefreshToken(token: string) {
  storage.setItem(REFRESH_TOKEN_KEY, token)
}

export function getRefreshToken() {
  return storage.getItem(REFRESH_TOKEN_KEY)
}
