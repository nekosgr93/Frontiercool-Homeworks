<template lang="pug">
button.flex.justify-center.items-center(@mouseenter="hover = true" @mouseleave="hover = false" @click.stop="$emit('remove-favorite')")
  font-awesome-icon.text-red-500(
    :icon="['fas', 'heart']"
    class=["hover:text-gray-500"]
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
defineEmits(['remove-favorite']);
const hover = ref(false);
</script>

<style scoped></style>
