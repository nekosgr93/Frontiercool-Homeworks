<template lang="pug">
button(
  class=["text-xl", "py-1", "px-2", "text-white",]
  :class="{ 'active-tab': active }"
  @click="$emit('tab-select')")
  p {{ label }}
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  active?: boolean;
}>();
const emit = defineEmits(['tab-select']);
</script>

<style scoped></style>
