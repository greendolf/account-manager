<template>
  <div>
    <v-btn @click="addNewAccount" color="primary">+ Добавить запись</v-btn>
    <AccountItem
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @update-data="updateData($event)"
      @delete-account="deleteAccount(account.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountsStore } from '@/stores/accountsStore'
import type { Account } from '@/types'
import AccountItem from '@/components/AccountItem.vue'

const accountsStore = useAccountsStore()

const { accounts } = storeToRefs(accountsStore)

function addNewAccount() {
  accountsStore.addAccount()
}

function updateData(account: Account) {
  accountsStore.updateAccount(account)
}

function deleteAccount(id: number) {
  accountsStore.deleteAccount(id)
}
</script>
