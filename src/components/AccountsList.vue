<template>
  <div>
    <AccountListItem
      v-for="(account, index) in accounts"
      :key="account.id"
      :account="account"
      :index="index"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAccountsStore } from '@/stores/accountsStore'
import AccountListItem from '@/components/AccountsListItem.vue'

const accountsStore = useAccountsStore()
const { accounts } = storeToRefs(accountsStore)
</script>
