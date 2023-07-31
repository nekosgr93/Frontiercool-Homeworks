<template lang="pug">
.space-y-6.flex.flex-col.items-center
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
import type { UserItem } from '@/components/items/user-item';
import { UserListItem } from '../items';

defineProps<{
  users: UserItem[];
}>();
</script>

<style scoped></style>
