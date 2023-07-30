<template lang="pug">
.flex.flex-col.items-center.justify-center.bg-gray-500.p-4.rounded-lg.space-y-4.py-8.w-52(@click="$emit('item-click')")
  img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="userPhoto.large" alt='user image')
  
  .flex.flex-row.space-x-2.justify-center.items-center
    .w-36.flex.justify-center
      h1.text-gray-50.font-semibold.truncate {{ userName }}
    HeartButton(size="medium")
</template>

<script setup lang="ts">
import type { UserItem } from './user-item';
import HeartButton from './Heart-Button.vue';
defineProps<UserItem>();
const emit = defineEmits(['item-click']);
</script>

<style scoped></style>
