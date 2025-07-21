import { defineStore } from 'pinia'
import { ref } from 'vue'
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

  function addAccount() {
    let id: number
    if (accounts.value.length > 0) {
      id = accounts.value[accounts.value.length - 1].id + 1
    } else id = 1
    accounts.value.push({ id, label: [], type: 'local', login: '', password: '', validated: false })
  }

  function updateAccount(newAccount: Account) {
    console.log(`Аккаунт ${newAccount.id} обновляется`)
    const index = accounts.value.findIndex((account) => (account.id = newAccount.id))
    accounts.value[index] = newAccount
    if (validateAccount(newAccount)) saveData()
  }

  function deleteAccount(id: number) {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    saveData()
  }

  function getLabelErrors(label: string): string[] {
    if (label.length > 50) return ['Максимум 50 символов']
    return []
  }

  function getLoginErrors(login: string): string[] {
    if (!login.trim()) return ['Логин обязателен']
    if (login.length > 100) return ['Максимум 100 символов']
    return []
  }

  function getPasswordErrors(password: string): string[] {
    if (!password.trim()) return ['Пароль обязателен']
    if (password.length > 100) return ['Максимум 100 символов']
    return []
  }

  function validateAccount(account: Account) {
    if (
      getLabelErrors(account.label.map((label) => label.text).join('; ')).length === 0 &&
      getLoginErrors(account.login).length === 0 &&
      getPasswordErrors(account.password).length === 0
    ) {
      account.validated = true
      return true
    }
  }

  function saveData() {
    localStorage.setItem(
      'accounts',
      JSON.stringify(accounts.value.filter((account) => account.validated)),
    )
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    loadFromLocalStorage,
    getLabelErrors,
    getLoginErrors,
    getPasswordErrors,
  }
})
