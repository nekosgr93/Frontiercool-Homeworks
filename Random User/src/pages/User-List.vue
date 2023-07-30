<template lang="pug">
User-List-Base
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { usePageSettingStore } from '@/stores';
import { UserDataKey } from './use-user-data';
import UserListBase from './components/User-List-Base.vue';
import { getUserList } from '@/services/user.service';
import type { UserItem } from '@/components/items/user-item';

const pageStore = usePageSettingStore();
const users = ref<UserItem[]>();
const totalPages = ref<number>();
const totalItems = ref<number>();

async function getUsers(currentPage: number, pageSize: number) {
  const result = await getUserList(currentPage, pageSize, pageStore.getPageSeed(currentPage));
  const _users = result.results.map(r => ({
    id: r.login.uuid,
    userName: `${r.name.first} ${r.name.last}`,
    userPhoto: {
      large: r.picture.large,
      medium: r.picture.medium,
    },
  }));
  pageStore.setPageSeed(currentPage, result.info.seed);
  users.value = _users;
  totalItems.value = result.totalItems;
  totalPages.value = result.totalPages;
}

provide(UserDataKey, {
  getUsers,
  users,
  totalItems,
  totalPages,
});
</script>

<style scoped></style>
./user-context
