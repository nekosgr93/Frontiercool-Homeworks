<template lang="pug">
.flex.flex-col.flex-1.h-screen.overflow-y-auto
  header.sticky.top-0.w-full.z-50
    HeaderBar
  main.flex.flex-1.justify-center
    router-view
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header/Header-Bar.vue';
</script>

<style scoped></style>
