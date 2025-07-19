export interface Account {
  id: string
  label: LabelItem[]
  type: 'ldap' | 'local'
  login: string
  password: string | null
}

export interface LabelItem {
  text: string
}
