<template>
  <div>
    <AccountListItem
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
import AccountListItem from '@/components/AccountsListItem.vue'
import type { Account } from '@/types'

const accountsStore = useAccountsStore()

const { accounts } = storeToRefs(accountsStore)

function updateData(account: Account) {
  accountsStore.updateAccount(account)
}

function deleteAccount(id: number) {
  accountsStore.deleteAccount(id)
}
</script>
