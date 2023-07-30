<template lang="pug">
button.flex.justify-center.items-center(@mouseenter="hover = true" @mouseleave="hover = false" @click="$emit('heart-click')")
  font-awesome-icon.text-red-500(
    :bounce="hover"
    :icon="[active ? 'fas' : 'far', 'heart']"
    :class="{ 'text-3xl': size === 'large', 'text-2xl': size === 'medium' }"
  )
</template>

<script setup lang="ts">
import { ref } from 'vue';
withDefaults(
  defineProps<{
    active?: boolean;
    size?: 'large' | 'medium';
  }>(),
  {
    active: false,
    size: 'medium',
  },
);
const emit = defineEmits(['heart-click']);
const hover = ref(false);
</script>

<style scoped></style>
