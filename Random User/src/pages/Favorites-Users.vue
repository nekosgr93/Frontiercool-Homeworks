<template lang="pug">
User-List-Base(empty-message="You didn't add any favorite users yet")
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import UserListBase from './components/User-List-Base.vue';
import { useFavoriteUsersStore } from '@/stores';
import type { UserItem } from '@/components/items/user-item';
import { useRouteInfo } from '@/composables/use-route-info';
import { UserDataKey } from './use-user-data';

const { currentPage, pageSize } = useRouteInfo();
const favoriteStore = useFavoriteUsersStore();

const users = computed<UserItem[]>(() => {
  const _users = Object.keys(favoriteStore.favoriteUsers).map(key => {
    const user = favoriteStore.favoriteUsers[key]!;
    return { id: key, ...user };
  });
  if (_users && _users.length > 0) {
    const start = (currentPage.value! - 1) * pageSize.value!;
    let end: number;

    if (currentPage.value === totalPages.value) {
      end = _users.length;
    } else {
      end = start + pageSize.value!;
    }

    return _users.slice(start, end);
  } else {
    return [];
  }
});
const totalPages = ref<number>();
const totalItems = ref<number>();

async function getFavoriteUsers(currentPage: number, pageSize: number) {
  const _users = Object.keys(favoriteStore.favoriteUsers);

  totalItems.value = _users.length;
  totalPages.value = Math.ceil(_users.length / pageSize);
}

provide(UserDataKey, {
  getUsers: getFavoriteUsers,
  users,
  totalItems,
  totalPages,
});
</script>

<style scoped></style>
