export function useLocalStorage() {
  return {
    setItem: <T>(key: string, data: T) => {
      localStorage.setItem(key, JSON.stringify(data))
    },
    getItem: <T>(key: string) => {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : undefined
    }
  }
}
