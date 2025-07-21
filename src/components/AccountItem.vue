<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col md="3">
          <v-text-field
            v-model="labelInput"
            label="Метка"
            :hint="'Введите метки через точку с запятой (максимум 50 символов)'"
            persistent-hint
            :error-messages="touchedInputs.label ? getLabelErrors(labelInput) : []"
            @blur="
              () => {
                touchedInputs.label = true
                parseLabel()
                updateAccount(localAccount)
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
            @update:model-value="updateAccount(localAccount)"
          />
        </v-col>
        <v-col md="2">
          <v-text-field
            v-model="localAccount.login"
            label="Логин"
            :counter="100"
            :error-messages="touchedInputs.login ? getLoginErrors(localAccount.login) : []"
            @blur="
              () => {
                touchedInputs.login = true
                updateAccount(localAccount)
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
            :error-messages="touchedInputs.password ? getPasswordErrors(localAccount.password) : []"
            @blur="
              () => {
                touchedInputs.password = true
                updateAccount(localAccount)
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
import type { Account, LabelItem } from '@/types'
import { useAccountsStore } from '@/stores/accountsStore'

const { account } = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'update-data', data: Account): void
  (e: 'delete-account', id: number): void
}>()

const { getLabelErrors, getLoginErrors, getPasswordErrors, updateAccount } = useAccountsStore()

const localAccount = ref<Account>(account)

const labelInput = ref<string>(localAccount.value.label.map((label) => label.text).join('; '))

const showPassword = ref<boolean>(false)
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

const touchedInputs = ref<{ label: boolean; login: boolean; password: boolean }>({
  label: false,
  login: false,
  password: false,
})

function parseLabel() {
  const arrLabel = labelInput.value.split(';').map((label): LabelItem => {
    return {
      text: label.trim(),
    }
  })
  localAccount.value.label = arrLabel
}

function deleteAccount() {
  emit('delete-account', localAccount.value.id)
}
</script>
