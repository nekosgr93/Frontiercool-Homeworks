<script setup lang="ts">
import type { User } from '@/types/user';
import HeartButton from './Heart-Button.vue';
const props = defineProps<{
  user: User;
}>();
const emit = defineEmits(['item-click']);
</script>

<template lang="pug">
.flex.flex-col.items-center.justify-center.bg-gray-500.p-4.rounded-lg.space-y-4.py-8(@click="$emit('item-click')")
  img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="user.picture.large" alt='user image')
  
  .flex.flex-row.space-x-2
    .w-36.flex.justify-center
      h1.text-gray-50.font-semibold.truncate {{ user.name.first + ' ' + user.name.last }}
    HeartButton
</template>

<style scoped></style>
