<template>
  <div class="jk-table">
    <div
      class="jk-table_header"
      :style="{
        gridTemplateColumns: headers.map((h) => (h.key === 'action' ? '95px' : '1fr')).join(' ')
      }"
    >
      <div v-for="(head, idx) in headers" :key="idx" class="jk-table_header-el">
        {{ head.key === 'action' ? '' : head.title || head.key }}
      </div>
    </div>
    <Loader v-if="loading" />
    <div v-else-if="!items.length" class="jk-table_empty">Данных нет!</div>
    <div v-else class="jk-table_body">
      <div
        v-for="row in items"
        :key="String(row[uniqueKey])"
        class="jk-table_body-el"
        :style="{
          gridTemplateColumns: headers.map((h) => (h.key === 'action' ? '95px' : '1fr')).join(' ')
        }"
      >
        <template v-if="$slots.default">
          <slot name="default" :item="row" />
        </template>
        <template v-else v-for="(head, idx) in headers" :key="idx">
          <slot
            v-if="$slots[`${head.key.toString()}`]"
            :name="`${head.key.toString()}`"
            :item="row"
          />
          <div v-else class="jk-table_body-el_col">
            <template v-if="head.key !== 'action'">
              {{ row[head.key] }}
            </template>
            <template v-else>
              <slot name="action" :item="row" />
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { ITableHeaders } from '@/types/ui/table'
import Loader from './Loader.vue'

interface IProps<T> {
  items: T[]
  headers: ITableHeaders<T>
  loading?: boolean
  uniqueKey: keyof T
}

defineProps<IProps<T>>()
</script>

<style lang="scss">
.jk-table {
  &_header {
    display: grid;
    &-el {
      background: $color-primary;
      padding: 8px 10px;
      font-size: $text-2xl;
    }
    & > &-el:first-child {
      border-radius: 8px 0 0;
    }
    & > &-el:last-child {
      border-radius: 0 8px 0 0;
    }
  }
  &_empty {
    display: flex;
    font-size: $text-4xl;
    padding-top: 24px;
    justify-content: center;
  }
  &_body {
    &-el {
      display: grid;
      & > div {
        padding: 8px 10px;
      }
    }
  }
}
</style>
