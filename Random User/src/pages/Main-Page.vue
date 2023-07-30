<template lang="pug">
.relative.flex.flex-col.flex-1.h-screen.overflow-y-auto.w-full
  header.fixed.top-0.w-full
    HeaderBar
  main.flex.flex-1.justify-center.pt-32.pb-32
    router-view
</template>

<script setup lang="ts">
import HeaderBar from '@/components/header/Header-Bar.vue';
</script>

<style scoped></style>
