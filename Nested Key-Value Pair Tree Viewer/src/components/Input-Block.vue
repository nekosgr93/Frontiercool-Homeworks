<template lang="pug">
input.flex.justify-center.items-center.p-3.border.border-slate-400.rounded-md.text-black.w-full(:value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
