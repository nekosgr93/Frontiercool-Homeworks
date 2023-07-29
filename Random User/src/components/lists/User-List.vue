<script setup lang="ts">
import type { ListDisplayType } from '@/stores/page-setting.store';
import type { User } from '../../types/user';
import { UserCard, UserListItem } from '../items';

defineProps<{
  users: User[];
  listType: ListDisplayType;
}>();
</script>

<template lang="pug">
div.w-full.px-20
  div(v-if="listType==='grid'" class=["grid", "md:gap-4", "xl:gap-8","sm:grid-cols-2", "md:grid-cols-4", "xl:grid-cols-5"])
    UserCard(
      v-for="user in users" 
      :key="user.id.value" 
      :user="user"
    )
  div.space-y-6.flex.flex-col.items-center(v-else)
    UserListItem(
      v-for="user in users" 
      :key="user.id.value" 
      :user="user"
      class=["w-4/5"]
    )
</template>

<style scoped></style>
