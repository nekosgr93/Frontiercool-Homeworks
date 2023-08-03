<template lang="pug">
.flex.flex-col.w-full.space-y-2
  input.flex.justify-center.items-center.p-3.border-2.shadow-md.rounded-md.text-black.w-full(
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" 
    :class="{ 'border-red-500': !!errorMessage, 'focus:outline-none': !!errorMessage, 'focus:ring-0': !!errorMessage }")
  p.text-red-500(v-if="errorMessage") {{ errorMessage }}
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string;
  errorMessage?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped></style>
