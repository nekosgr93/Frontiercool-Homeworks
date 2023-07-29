<script setup lang="ts">
defineProps<{
  pageLength: number;
}>();
</script>

<template lang="pug">
.flex.flex-1.item-center.justify-center.py-4
  v-pagination(
    :length=pageLength
  )
</template>

<style scoped></style>
