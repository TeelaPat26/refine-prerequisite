export const ACCESS_TOKEN_KEY = 'access-token'

const storage = localStorage

export function clearAccessToken() {
  return storage.removeItem(ACCESS_TOKEN_KEY)
}

export function saveAccessToken(token: string) {
  storage.setItem(ACCESS_TOKEN_KEY, token)
}

export function getAccessToken() {
  return storage.getItem(ACCESS_TOKEN_KEY)
}
