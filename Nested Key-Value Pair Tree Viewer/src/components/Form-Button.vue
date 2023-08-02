<template lang="pug">
button.rounded-md.p-1.text-xl.bold.bg-slate-100.text-black.shadow-md(@click="$emit('btn-click')" class=["hover:bg-slate-400"])
  slot
</template>

<script setup lang="ts">
defineEmits(['btn-click']);
</script>

<style scoped></style>
