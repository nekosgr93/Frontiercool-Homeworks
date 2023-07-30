<template lang="pug">
div.w-full
  div(v-if="listType === 'grid'" class=["grid", "md:gap-4", "xl:gap-8","sm:grid-cols-2", "md:grid-cols-4", "xl:grid-cols-5"])
    UserCard(
      v-for="user in users" 
      :key="user.id" 
      :id="user.id"
      :user-name="user.userName"
      :user-photo="user.userPhoto"
    )
  .space-y-6.flex.flex-col.items-center(v-else)
    UserListItem(
      v-for="user in users" 
      :key="user.id" 
      :id="user.id"
      :user-name="user.userName"
      :user-photo="user.userPhoto"
      class=["w-full"]
    )
</template>

<script setup lang="ts">
import type { ListDisplayType } from '@/types/page-setting';
import type { UserItem } from '@/components/items/user-item';
import { UserCard, UserListItem } from '../items';

defineProps<{
  users: UserItem[];
  listType: ListDisplayType;
}>();
</script>

<style scoped></style>
