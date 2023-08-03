<template lang="pug">
button.flex.justify-center.items-center.rounded-md.p-2.text-xl.bold.bg-slate-100.text-black.shadow-md(
  @click="$emit('btn-click')" 
  class=["min-w-[40px]", "hover:bg-slate-400"]
  )
  slot
</template>

<script setup lang="ts">
defineEmits(['btn-click']);
</script>

<style scoped></style>
