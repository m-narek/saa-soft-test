import type { IAccountValidation, TValidateKeys } from '@/types/account'
import type { ISelectOption } from '@/types/ui/select'

export const accountTypeOptions: ISelectOption[] = [
  {
    label: 'LDAP',
    value: 'ldap'
  },
  {
    label: 'Local',
    value: 'local'
  }
]

export const accountValidations: Record<TValidateKeys, IAccountValidation> = {
  login: {
    maxLength: 100
  },
  password: {
    maxLength: 100
  },
  type: {},
  labels: {
    maxLength: 50
  }
}
