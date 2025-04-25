<template>
  <div class="home">
    <div class="home-head">
      <h3 class="home-head_title">Учетные Записи</h3>
      <Button @click="handleAddAccount">Добавить</Button>
    </div>
    <div class="home-info">
      <img src="../assets/icons/info.svg" class="home-info_icon" alt="" />
      <span class="home-info_text"
        >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span
      >
    </div>
    <Table :headers="headers" unique-key="id" :items="accounts" :loading="accountsStore.isLoading">
      <template #default="{ item }">
        <AccountRow
          :item="item"
          @update:labels="(labels) => (item.labels = labels)"
          @change:type="handleChangeAccountType"
          @delete="handleDelete"
          @submit="handleSubmit"
        />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import AccountRow from '@/components/AccountRow.vue'
import Button from '@/components/ui/Button.vue'
import Table from '@/components/ui/Table.vue'
import { useAccountsStore } from '@/stores/accounts'
import type { IAccount } from '@/types/account'
import type { ITableHeaders } from '@/types/ui/table'
import { generateRandomId } from '@/utils/helpers/account'
import { onMounted, ref } from 'vue'

const headers: ITableHeaders<IAccount> = [
  {
    key: 'labels',
    title: 'Метки'
  },
  {
    key: 'type',
    title: 'Тип записи'
  },
  {
    key: 'login',
    title: 'Логин'
  },
  {
    key: 'password',
    title: 'Пароль'
  },
  {
    key: 'action'
  }
]

const accountsStore = useAccountsStore()
const accounts = ref<IAccount[]>([])

const handleAddAccount = () => {
  accounts.value = [
    ...accounts.value,
    {
      id: generateRandomId(),
      labels: [],
      login: '',
      password: ''
    }
  ]
}

const handleChangeAccountType = (id: string) => {
  const idx = accounts.value.findIndex((item) => item.id === id)
  if (accounts.value[idx].type === 'ldap') {
    accounts.value[idx].password = null
  }
}

const handleDelete = (id: string, submit: boolean) => {
  accounts.value = accounts.value.filter((item) => item.id !== id)
  if (submit) {
    accountsStore.deleteAccount(id)
  }
}

const handleSubmit = (account: IAccount) => {
  accountsStore.addAccount(account)
}

onMounted(async () => {
  accounts.value = (await accountsStore.fetchAccounts()) || []
})
</script>

<style scoped lang="scss">
.home {
  &-head {
    display: flex;
    align-items: center;
    padding-bottom: 12px;
    justify-content: space-between;
    gap: 8px;

    &_title {
      font-weight: 600;
      font-size: $text-4xl;
    }
  }
  &-info {
    border-radius: 8px;
    padding: 10px 12px;
    background: $color-gray-light;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    &_icon {
      width: 26px;
      fill: red;
    }
  }
}
</style>
