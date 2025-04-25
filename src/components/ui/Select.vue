<template>
  <div
    :class="['jk-select', !selected && '_empty', error && '_error']"
    v-click-outside="closeDropdown"
  >
    <div :class="['jk-select-trigger', isOpen && '_open']" @click="handleToggle">
      <span class="jk-select-trigger_label">{{ selected?.label || placeholder }}</span>
      <img
        v-if="withIcon"
        src="../../assets/icons/arrow-down.svg"
        alt=""
        class="jk-select-trigger_icon"
      />
    </div>
    <div v-if="error && errorMessage" class="jk-select_errorMessage">{{ errorMessage }}</div>

    <div
      :class="['jk-select-list', isOpen ? '_open' : '']"
      :style="{
        height: isOpen ? `${listHeight}px` : 0
      }"
      ref="listEl"
    >
      <div
        v-for="(option, idx) in options"
        :key="idx"
        :class="['jk-select-list_option', selected?.value === option.value && '_selected']"
        @click="handleSelect(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISelectOption } from '@/types/ui/select'
import { computed, ref, watch } from 'vue'

interface IProps {
  placeholder?: string
  withIcon?: boolean
  closeOnSelect?: boolean
  enableSecondNull?: boolean
  options: ISelectOption[]
  defaultOpen?: boolean
  modelValue?: string
  error?: boolean
  errorMessage?: string
}

interface IEmits {
  (event: 'update:modelValue', value?: string | number): void
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Select',
  withIcon: true,
  closeOnSelect: true,
  enableSecondNull: true
})
const emit = defineEmits<IEmits>()

const listEl = ref<null | HTMLDivElement>(null)
const isOpen = ref(props.defaultOpen)
const allHeight = ref(false)

const selected = computed(() => props.options?.find((option) => option.value === props.modelValue))

const listHeight = computed(() => {
  let height = 0
  listEl.value?.querySelectorAll('.jk-select-list_option').forEach((el) => {
    height += el.clientHeight
  })
  return height
})

const closeDropdown = () => (isOpen.value = false)
const handleToggle = () => (isOpen.value = !isOpen.value)

const handleSelect = (value: string) => {
  const isSameValue = props.modelValue === value

  if (props.closeOnSelect && !isSameValue) handleToggle()
  emit('update:modelValue', props.enableSecondNull && isSameValue ? undefined : value)
}

watch(isOpen, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      allHeight.value = true
    }, 200)
  } else {
    allHeight.value = false
  }
})
</script>

<style scoped lang="scss">
.jk-select {
  position: relative;
  min-width: 200px;
  height: max-content;
  &._empty {
    .jk-select-trigger {
      &_label {
        color: $color-dark-cc;
      }
    }
  }
  &-trigger {
    width: 100%;
    border: 2px solid $color-secondary;
    padding: 4px 8px;
    font-size: $text-xl;
    background: $color-gray-light;
    color: $color-dark;
    border-radius: $radius-base;
    cursor: pointer;
    min-height: 33px;
    transition: all $duration-min;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_label {
      max-width: 90%;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:hover {
      border-color: $color-primary;
    }
    &._open {
      border-color: $color-primary;
      & > img {
        transform: rotate(180deg);
      }
    }
    &_icon {
      max-width: 18px;
      transition: all $duration-base;
    }
  }
  &_errorMessage {
    color: $color-red;
    font-size: $text-sm;
    margin-top: 4px;
  }
  &-list {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: $shadow-box;
    left: 0%;
    z-index: 100;
    top: 40px;
    border-radius: 4px;
    background: $color-gray-light;
    overflow: hidden;
    transition: all $duration-base;
    &_option {
      padding: 6px 8px;
      cursor: pointer;
      transition: all $duration-base;
      &:hover {
        background: $color-primary-cc;
      }
      &._selected {
        background: $color-primary;
      }
    }
  }
}
.jk-select._error {
  .jk-select-trigger {
    border-color: $color-red;
  }
}
</style>
