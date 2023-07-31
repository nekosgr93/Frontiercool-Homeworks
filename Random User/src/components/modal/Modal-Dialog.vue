<template lang="pug">
teleport(to="#modal")
  .fixed.inset-0.bg-black.bg-opacity-50(v-if="show")
    .flex.flex-1.justify-center.items-center.h-screen
      div.flex.justify-center.items-center(class=["w-1/2"])
        slot
</template>

<script setup lang="ts">
import { watch } from 'vue';
defineProps<{
  show?: boolean;
}>();
</script>

<style scoped></style>
