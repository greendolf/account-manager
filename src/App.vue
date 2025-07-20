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
  accountsStore.addAccount({
    label: [],
    type: 'local',
    login: '',
    password: '',
  })
  console.log('Аккаунт добавлен')
}
</script>

<style scoped></style>
