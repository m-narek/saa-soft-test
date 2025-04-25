<template>
  <div class="cell _labels">
    <Input
      :model-value="convertLabelToString(initialData.labels)"
      @update:modelValue="
        (val) => {
          const labels = convertStringToLabel(val)
          emit('update:labels', labels)
        }
      "
      @blur="(val) => handleValidate('labels', val)"
      :error="!!errors.labels"
      :error-message="errors.labels"
    />
  </div>

  <div class="cell">
    <Select
      v-model="initialData.type"
      :options="accountTypeOptions"
      @update:model-value="
        (val) => {
          handleValidate('type', val?.toString() || '')
          emit('change:type', initialData.id)
        }
      "
      :error="!!errors.type"
      :error-message="errors.type"
    />
  </div>

  <div :class="['cell', { _long: initialData.type === 'ldap' }]">
    <Input
      v-model="initialData.login"
      @blur="(val) => handleValidate('login', val)"
      :error="!!errors.login"
      :error-message="errors.login"
    />
  </div>

  <div class="cell" v-if="initialData.type !== 'ldap'">
    <Input
      v-model="initialData.password"
      @blur="(val) => handleValidate('password', val)"
      :error="!!errors.password"
      :error-message="errors.password"
      type="password"
    />
  </div>

  <div class="cell _action">
    <Button @click="handleDelete">Удалить</Button>
  </div>
</template>

<script setup lang="ts">
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Button from '@/components/ui/Button.vue'
import {
  accountBaseFieldValid,
  convertLabelToString,
  convertStringToLabel
} from '@/utils/helpers/account'
import { accountTypeOptions, accountValidations } from '@/utils/constants/account'
import type { IAccount, TValidateKeys } from '@/types/account'
import { ref } from 'vue'

const props = defineProps<{
  item: IAccount
}>()

const emit = defineEmits<{
  (e: 'update:labels', labels: IAccount['labels']): void
  (e: 'change:type', id: string): void
  (e: 'delete', id: string, submit: boolean): void
  (e: 'submit', item: IAccount): void
}>()

const initialData = ref(props.item)
const errors = ref<Record<TValidateKeys, string>>({
  type: '',
  login: '',
  password: '',
  labels: ''
})

const handleValidateAccount = () => {
  const isValid = Object.keys(errors.value).map((key) => {
    let cond = false
    const modifiedValue =
      key === 'labels'
        ? convertLabelToString(initialData.value[key])
        : initialData.value[key as keyof IAccount]
    const valid = !accountBaseFieldValid(
      modifiedValue?.toString() || '',
      accountValidations[key as TValidateKeys]
    )
    if (key === 'password') {
      cond = initialData.value.type === 'ldap' || valid
    } else {
      cond = valid
    }
    return cond
  })
  return isValid.every((item) => item)
}

const handleValidate = (key: TValidateKeys, value: string) => {
  const isValid = handleValidateAccount()

  if (isValid) {
    emit('submit', initialData.value)
  }
  errors.value[key] = accountBaseFieldValid(value, accountValidations[key]) || ''
}

const handleDelete = () => {
  emit('delete', initialData.value.id, handleValidateAccount())
}
</script>

<style scoped lang="scss">
.cell {
  padding: 8px 10px;
}
._labels {
  padding-left: 0px;
}
._long {
  grid-column-start: 3;
  grid-column-end: 5;
  grid-column: 2fr;
}
._action {
  padding-right: 0px;
  justify-self: end;
}
</style>
