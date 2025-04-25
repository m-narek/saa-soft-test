<template>
  <div :class="['jk-loader', size]">
    <img class="jk-loader_icon" :src="loadingGif" alt="Loading" />
  </div>
</template>

<script setup lang="ts">
import loadingGif from '@/assets/imgs/loading.gif'
import type { TBoxSize } from '@/types/ui/main'

interface IProps {
  size?: TBoxSize
}

withDefaults(defineProps<IProps>(), {
  size: 'base'
})
</script>

<style scoped lang="scss">
.jk-loader {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.base {
    & > img {
      width: 32px;
    }
  }
  &.sm {
    & > img {
      width: 20px;
    }
  }
  &.xl {
    & > img {
      width: 48px;
    }
  }
}
</style>
