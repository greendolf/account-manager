<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col md="3">
          <v-text-field
            v-model="localAccount.label"
            label="Метка"
            :hint="'Введите метки через точку с запятой (максимум 50 символов)'"
            persistent-hint
          />
        </v-col>
        <v-col md="3">
          <v-select
            v-model="localAccount.type"
            label="Тип записи"
            :items="[
              { title: 'LDAP', value: 'ldap' },
              { title: 'Локальная', value: 'local' },
            ]"
          />
        </v-col>
        <v-col md="2">
          <v-text-field v-model="localAccount.login" label="Логин" :counter="100" />
        </v-col>
        <v-col md="2" v-if="localAccount.type === 'local'">
          <v-text-field v-model="localAccount.password" label="Пароль" :counter="100" />
        </v-col>
        <v-col md="2">
          <v-btn @click="deleteAccount" icon="mdi-delete" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Account } from '@/types'

const { account, index } = defineProps<{
  account: Account
  index: number
}>()

const localAccount = ref<Account>(account)

function deleteAccount() {}
</script>
