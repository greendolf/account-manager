import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import type { Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(loadFromLocalStorage())

  function loadFromLocalStorage(): Account[] {
    const saved = localStorage.getItem('accounts')
    if (saved) {
      return JSON.parse(saved)
    }
    return []
  }

  function addAccount(account: Omit<Account, 'id'>) {
    let id: number
    if (accounts.value.length > 0) {
      id = accounts.value[accounts.value.length - 1].id + 1
    } else id = 1
    accounts.value.push({ id, ...account })
  }

  function updateAccount(newAccount: Account) {
    console.log(`Аккаунт ${newAccount.id} обновляется`)
    const index = accounts.value.findIndex((account) => (account.id = newAccount.id))
    accounts.value[index] = newAccount
  }

  function deleteAccount(id: number) {
    accounts.value = accounts.value.filter((account) => account.id !== id)
  }

  watchEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  })

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    loadFromLocalStorage,
  }
})
