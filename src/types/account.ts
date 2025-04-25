export type TAccountType = 'ldap' | 'local'

export interface IAccountLabel {
  text: string
}

export interface IAccount {
  id: string
  login: string
  password: string | null
  type?: TAccountType
  labels: IAccountLabel[]
}

export type TValidateKeys = keyof Omit<IAccount, 'id'>

export interface IAccountValidation {
  maxLength?: number
  required?: boolean
}
