<template>
  <v-app>
    <v-container>
      <h1>Управление учетными записями</h1>
      <v-btn @click="addNewAccount" color="primary">+ Добавить запись</v-btn>
      <AccountsList />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accountsStore'
import AccountsList from './components/AccountsList.vue'

const accountsStore = useAccountsStore()

function addNewAccount() {
  console.log('Аккаунт добавлен')
  accountsStore.addAccount({
    id: Date.now().toString(),
    label: [],
    type: 'local',
    login: '',
    password: '',
  })
}
</script>

<style scoped></style>
