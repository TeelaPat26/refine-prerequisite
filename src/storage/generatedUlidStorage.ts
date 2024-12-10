const GENERATED_ULID_KEY = 'generated-ulid'
const storage = localStorage

export function clearGeneratedUlid() {
  return storage.removeItem(GENERATED_ULID_KEY)
}

export function saveGeneratedUlid(id: string) {
  storage.setItem(GENERATED_ULID_KEY, id)
}

export function getGeneratedUlid() {
  return storage.getItem(GENERATED_ULID_KEY)
}
