<template lang="pug">
teleport(to="#modal")
  .fixed.inset-0.bg-black.bg-opacity-50(v-if="show" @click="handleBackdropClick" class=["z-[999]"])
    .flex.flex-1.justify-center.items-center.h-screen
      div.flex.justify-center.items-center(class=["w-min"] ref="modalRef")
        slot
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  show?: boolean;
}>();

const emit = defineEmits(['backdrop-click']);
const modalRef = ref<HTMLElement | null>(null);

function handleBackdropClick(event: Event) {
  if (modalRef.value && !event.composedPath().includes(modalRef.value)) {
    emit('backdrop-click');
  }
}
</script>

<style scoped></style>
