<template lang="pug">
.flex.flex-row.rounded-lg.divide-x.bg-white
  button.px-4.py-2(
    v-for="option in options"
    class=["px-4", "py-2", "hover:bg-orange-400", "first:rounded-l-lg", "last:rounded-r-lg"]
    :class="{ active: option.value === modelValue }"
    :key="option.value" 
    @click="$emit('update:modelValue', option.value)"
  )
    font-awesome-icon.text-xl(:icon="['fas', option.icon]")
</template>

<script setup lang="ts">
defineProps<{
  options: {
    icon: string;
    value: string;
  }[];
  modelValue: string;
}>();
defineEmits(['update:modelValue']);
</script>

<style scoped>
.active {
  @apply text-slate-50	bg-orange-600 first:rounded-l-lg last:rounded-r-lg;
}
</style>
