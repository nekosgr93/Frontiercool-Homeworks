<script setup lang="ts">
defineProps<{
  title: string;
  active?: boolean;
}>();
const emit = defineEmits(["click"]);
</script>

<template lang="pug">
button(
  class=["w-32", "text-xl", "py-1", "px-2", "bg-white", "rounded-md"] 
  :class="{ 'active-tab': active }"
  @click="$emit('click')")
  p {{ title }}
</template>

<style scoped>
.active-tab {
  @apply bg-emerald-800	text-zinc-100;
}
</style>
