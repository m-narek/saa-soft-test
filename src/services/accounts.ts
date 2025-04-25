import type { IAccount } from '@/types/account'

export class AccountsApi {
  public static async getAll(): Promise<IAccount[] | null> {
    try {
      const response = await fetch('/src/utils/data/accounts.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to fetch accounts:', error)
      return null
    }
  }
}
