export interface Account {
  id: number
  label: LabelItem[]
  type: 'ldap' | 'local'
  login: string
  password: string
  validated: boolean
}

export interface LabelItem {
  text: string
}
