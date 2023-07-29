<template lang="pug">
.flex.flex-row.bg-gray-500.px-8.rounded-lg.space-y-4.py-8.justify-between.items-center(@click="$emit('item-click')")
  .flex.space-x-2
    img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="user.picture.medium" alt='user image')
    .flex.justify-center.items-center(class=["md:w-36"])
      h1.text-gray-50.font-semibold.truncate {{ user.name.first + ' ' + user.name.last }}
  HeartButton
</template>

<script setup lang="ts">
import type { User } from '@/types/user';
import HeartButton from './Heart-Button.vue';

defineProps<{
  user: User;
}>();

const emit = defineEmits(['item-click']);
</script>

<style scoped></style>
