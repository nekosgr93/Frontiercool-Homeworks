<script setup lang="ts">
import type { ItemProps } from "./item-props";

const props = defineProps<ItemProps>();
const emit = defineEmits(["item-click"]);
</script>

<template lang="pug">
.flex.flex-col.items-center.justify-center.bg-gray-700.p-4.rounded-lg.space-y-4.py-8
  img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="photoUrl" alt='user image')
  h1.text-gray-50.font-semibold {{ userName }}
  button.px-8.py-1.border-2.border-indigo-600.bg-indigo-600.rounded-full.text-gray-50.font-semibold(@click="$emit('itemClick')") Follow
</template>

<style scoped></style>
