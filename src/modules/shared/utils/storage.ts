const storage = {
  get: (key: string) => {
    return localStorage.getItem(key)
  },
  set: async (key, value) => {
    await localStorage.setItem(key, value)
  },
  remove: (key: string) => {
    localStorage.removeItem(key)
  },
}

export default storage
