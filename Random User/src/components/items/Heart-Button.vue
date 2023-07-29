<template lang="pug">
button(@mouseenter="hover = true" @mouseleave="hover = false" @click="$emit('heart-click')")
  font-awesome-icon.text-red-500.text-xl(
    :bounce="hover"
    v-if="active" 
    :icon="['fas', 'heart']"
  )
  font-awesome-icon.text-red-500.text-xl(
    :bounce="hover"
    v-else 
    :icon="['far', 'heart']")
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  active?: boolean;
}>();
const emit = defineEmits(['heart-click']);
const hover = ref(false);
</script>

<style scoped></style>
