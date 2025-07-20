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
            :error-messages="getLabelErrors()"
            @blur="
              () => {
                touchedInputs.label = true
                validateAccount()
              }
            "
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
            @update:model-value="validateAccount"
          />
        </v-col>
        <v-col md="2">
          <v-text-field
            v-model="localAccount.login"
            label="Логин"
            :counter="100"
            :error-messages="getLoginErrors()"
            @blur="
              () => {
                touchedInputs.login = true
                validateAccount()
              }
            "
          />
        </v-col>
        <v-col md="2" v-if="localAccount.type === 'local'">
          <v-text-field
            v-model="localAccount.password"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            :counter="100"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="togglePasswordVisibility"
            :error-messages="getPasswordErrors()"
            @blur="
              () => {
                touchedInputs.password = true
                validateAccount()
              }
            "
          />
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

const { account } = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'update-data', data: Account): void
  (e: 'delete-account', id: number): void
}>()

const localAccount = ref<Account>({ ...account })

const showPassword = ref<boolean>(false)
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

const touchedInputs = ref<{ label: boolean; login: boolean; password: boolean }>({
  label: false,
  login: false,
  password: false,
})

function isValidAccount() {
  return (
    getLabelErrors().length === 0 &&
    getLoginErrors().length === 0 &&
    getPasswordErrors().length === 0
  )
}

function validateAccount() {
  if (isValidAccount() && touchedInputs.value.login && touchedInputs.value.password) {
    console.log(`Аккаунт ${localAccount.value.id} подтверждён`)
    emit('update-data', localAccount.value)
  }
}

function getLabelErrors() {
  if (!touchedInputs.value.label) return []
  if (localAccount.value.label.length > 50) return ['Максимум 50 символов']
  return []
}

function getLoginErrors() {
  if (!touchedInputs.value.login) return []
  if (!localAccount.value.login.trim()) return ['Логин обязателен']
  if (localAccount.value.login.length > 100) return ['Максимум 100 символов']
  return []
}

function getPasswordErrors() {
  if (!touchedInputs.value.password) return []
  if (localAccount.value.type === 'local' && !localAccount.value.password)
    return ['Пароль обязателен']
  if (localAccount.value.password && localAccount.value.password.length > 100)
    return ['Максимум 100 символов']
  return []
}
function deleteAccount() {
  emit('delete-account', localAccount.value.id)
}
</script>
