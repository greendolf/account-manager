import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import type { Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('accounts')
    if (saved) {
      accounts.value = JSON.parse(saved)
    }
  }

  function addAccount(account: Account) {
    accounts.value.push(account)
  }

  function updateAccount(index: number, account: Account) {
    accounts.value[index] = account
  }

  function deleteAccount(index: number) {
    accounts.value.splice(index, 1)
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
