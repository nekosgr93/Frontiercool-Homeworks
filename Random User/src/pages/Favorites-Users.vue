<template lang="pug">
User-List-Base(empty-message="You didn't add any favorite users yet")
</template>

<script setup lang="ts">
import { computed, provide, watch } from 'vue';
import UserListBase from './components/User-List-Base.vue';
import { useFavoriteUsersStore } from '@/stores';
import type { UserItem } from '@/components/items/user-item';
import { useRouteInfo } from '@/composables/use-route-info';
import { UserDataKey } from './use-user-data';
import { useRouter } from 'vue-router';

const { currentPage, pageSize, name, listType } = useRouteInfo();
const router = useRouter();
const favoriteStore = useFavoriteUsersStore();

const users = computed<UserItem[]>(() => {
  const _users = Object.keys(favoriteStore.favoriteUsers).map(key => {
    const user = favoriteStore.favoriteUsers[key]!;
    return { id: key, ...user };
  });
  if (_users && _users.length > 0) {
    if (currentPage.value! > totalPages.value) {
      return [];
    }

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
const totalPages = computed<number>(() => {
  const _users = Object.keys(favoriteStore.favoriteUsers);
  return Math.ceil(_users.length / pageSize.value!);
});
const totalItems = computed<number>(() => {
  const _users = Object.keys(favoriteStore.favoriteUsers);
  return _users.length;
});

async function getFavoriteUsers() {}

watch(users, () => {
  if (users.value && users.value.length < 1 && currentPage.value! > 1) {
    router.push({
      name: name.value,
      query: {
        page: currentPage.value! - 1,
        pageSize: pageSize.value,
        listType: listType.value!,
      },
    });
  }
});

provide(UserDataKey, {
  getUsers: getFavoriteUsers,
  users,
  totalItems,
  totalPages,
});
</script>

<style scoped></style>
