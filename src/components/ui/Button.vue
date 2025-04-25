<template>
  <button :class="['jk-button', btnClassNames[variant]]" @click="emit('click')">
    <Loader v-if="loading" size="sm" />
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import Loader from './Loader.vue'
import type { TButtonType, TButtonVariant } from '@/types/ui/button'
import { btnClassNames } from '@/utils/constants/button'

interface IEmits {
  (event: 'click'): void
}

interface IProps {
  variant?: TButtonVariant
  type?: TButtonType
  loading?: boolean
}

const emit = defineEmits<IEmits>()

withDefaults(defineProps<IProps>(), {
  variant: 'filled',
  type: 'button'
})
</script>

<style scoped lang="scss">
.jk-button {
  cursor: pointer;
  color: $color-dark;
  position: relative;
  font-size: $text-xl;
  transition:
    transform 0.1s ease,
    background $duration-base,
    border-color $duration-base,
    color $duration-base;

  &-content {
    position: relative;
    z-index: 2;
    .jk-loader {
      padding: 0;
    }
  }

  &.spacings {
    padding: 4px 8px;
  }

  &.filled,
  &.outlined {
    border-radius: $radius-base;
    border: 2px solid $color-primary;
  }

  &.filled {
    background: $color-primary;
  }

  &.text {
    position: relative;
    font-weight: 500;
    &::after {
      content: '';
      position: absolute;
      top: 130%;
      left: 0;
      width: 100%;
      height: 2px;
      background: $color-primary;
      transition: all $duration-base ease;
      opacity: 0;
    }
    &:hover::after {
      top: 100%;
      opacity: 1;
    }
  }

  &.filled:hover {
    background: $color-secondary;
    border-color: $color-secondary;
    color: $color-light;
  }

  &.outlined:hover {
    background: $color-primary;
  }
}
</style>
