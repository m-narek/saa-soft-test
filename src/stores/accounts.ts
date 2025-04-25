import { useLocalStorage } from '@/hooks/useLocalStorage'
import { AccountsApi } from '@/services/accounts'
import type { IAccount } from '@/types/account'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<IAccount[] | null>(null)
  const isLoading = ref(false)
  const { getItem, setItem } = useLocalStorage()

  const fetchAccounts = async () => {
    isLoading.value = true
    const localData = getItem<IAccount[]>('accounts')

    accounts.value = localData || (await AccountsApi.getAll())
    !localData && setItem('accounts', accounts.value)

    isLoading.value = false
    return accounts.value
  }

  const deleteAccount = (id: string) => {
    accounts.value = (accounts.value || []).filter((account) => account.id !== id)
    saveAccounts()
    return accounts.value
  }

  const addAccount = (account: IAccount) => {
    const idx = accounts.value?.findIndex((item) => item.id === account.id)!
    if (idx !== -1) {
      accounts.value![idx] = account
    } else {
      accounts.value?.push(account)
    }

    saveAccounts()
  }

  const saveAccounts = () => {
    setItem('accounts', accounts.value)
  }

  return { accounts, isLoading, fetchAccounts, deleteAccount, addAccount }
})
