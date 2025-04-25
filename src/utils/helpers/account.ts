import type { IAccountLabel, IAccountValidation } from '@/types/account'

export const convertLabelToString = (value: IAccountLabel[]) =>
  value
    .map((label) => label.text)
    .filter((text) => text != null && text !== '')
    .join('; ')

export const convertStringToLabel = (value: string) =>
  value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))

export const accountBaseFieldValid = (value: string, options: IAccountValidation) => {
  const { maxLength, required = true } = options || {}

  if (required && !value) {
    return 'Обязательное к заполнению'
  }
  if (maxLength && value.length > maxLength) {
    return `Максимум ${maxLength} символов`
  }
}

export const generateRandomId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(11)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => chars[byte % chars.length]).join('')
}
