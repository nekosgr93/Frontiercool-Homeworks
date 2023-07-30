<template lang="pug">
.flex.flex-row.bg-gray-500.px-10.rounded-lg.space-y-4.py-8.justify-between.items-center(@click="$emit('item-click')")
  .flex.space-x-2
    img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="userPhoto.medium" alt='user image')
    .flex.justify-center.items-center(class=["md:w-36"])
      h1.text-gray-50.font-semibold.truncate {{ userName }}
  HeartButton(size="large")
</template>

<script setup lang="ts">
import type { UserItem } from './user-item';
import HeartButton from './Heart-Button.vue';

defineProps<UserItem>();

const emit = defineEmits(['item-click']);
</script>

<style scoped></style>
