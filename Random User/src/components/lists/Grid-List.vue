<template lang="pug">
.w-fit(class=["grid", "sm:gap-4", "xl:gap-8","sm:grid-cols-1", "md:grid-cols-3", "xl:grid-cols-5"])
  UserCard(
    v-for="user in users" 
    :key="user.id" 
    :id="user.id"
    :user-name="user.userName"
    :user-photo="user.userPhoto"
  )
</template>

<script setup lang="ts">
import type { UserItem } from '@/components/items/user-item';
import { UserCard } from '../items';

defineProps<{
  users: UserItem[];
}>();
</script>

<style scoped></style>
