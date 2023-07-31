<template lang="pug">
button.flex.justify-center.items-center.m-0(@mouseenter="hover = true" @mouseleave="hover = false" @click="$emit('add-favorite')")
  font-awesome-icon.text-red-500.remove-fa-icon-margin(
    :bounce="hover"
    :icon="['far', 'heart']"
    class=["hover:text-red-400"]
    :class="{ 'text-3xl': size === 'large', 'text-2xl': size === 'medium' }"
  )
</template>

<script setup lang="ts">
import { ref } from 'vue';
withDefaults(
  defineProps<{
    size?: 'large' | 'medium';
  }>(),
  {
    size: 'medium',
  },
);
const emit = defineEmits(['add-favorite']);
const hover = ref(false);
</script>

<style scoped></style>
