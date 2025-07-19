export interface Account {
  id: string
  label: string
  type: 'ldap' | 'local'
  login: string
  password: string | null
  isValid?: boolean
  touchedFields?: {
    label?: boolean
    type?: boolean
    login?: boolean
    password?: boolean
  }
}
