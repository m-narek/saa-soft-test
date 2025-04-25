<template>
  <label :class="['jk-input', error && 'error']">
    <div v-if="label">{{ label }}</div>
    <div class="jk-input-wrapper">
      <input
        :type="convertedType"
        :value="modelValue"
        class="jk-input-wrapper_base"
        @input="handleChange"
        @blur="handleBlur"
      />
      <button v-if="type === 'password'" class="jk-input-wrapper-show" @click="handleToggleShow">
        <img :src="isPassShow ? EyeIcon : EyeHideIcon" class="jk-input-wrapper-show_icon" />
      </button>
    </div>
    <span v-if="error && errorMessage" class="jk-input-base_errorMessage">{{ errorMessage }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import EyeIcon from '@/assets/icons/eye.svg'
import EyeHideIcon from '@/assets/icons/eye-hide.svg'
import type { TInputType } from '@/types/ui/input'

interface IProps {
  type?: TInputType
  label?: string
  errorMessage?: string
  error?: boolean
  modelValue?: string | null
}

interface IEmits {
  (event: 'update:modelValue', value: string): void
  (event: 'blur', value: string): void
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text'
})
const emit = defineEmits<IEmits>()

const isPassShow = ref(false)

const convertedType = computed(() =>
  props.type !== 'password' ? props.type : isPassShow.value ? 'text' : 'password'
)

const handleChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

const handleBlur = (e: Event) => {
  const input = e.target as HTMLInputElement
  emit('blur', input.value)
}

const handleToggleShow = () => (isPassShow.value = !isPassShow.value)
</script>

<style scoped lang="scss">
.jk-input {
  display: flex;
  flex-direction: column;

  &.error {
    .jk-input-wrapper_base {
      border-color: $color-red;
    }

    .jk-input-base_errorMessage {
      color: $color-red;
    }
  }

  .jk-input-wrapper {
    position: relative;

    &_base {
      width: 100%;
      border: 2px solid $color-secondary;
      font-size: $text-xl;
      background: $color-gray-light;
      color: $color-dark;
      border-radius: $radius-base;
      padding: 6px 8px;
      font-size: $text-base;

      &:focus {
        border-color: $color-primary;
      }
    }

    &-show {
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      cursor: pointer;
      padding: 3px;
      transition: all $duration-base ease;
      :hover {
        border-radius: 50%;
        background: $color-light;
      }
      &_icon {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
  }

  .jk-input-base_errorMessage {
    font-size: $text-sm;
    margin-top: 4px;
  }
}
</style>
