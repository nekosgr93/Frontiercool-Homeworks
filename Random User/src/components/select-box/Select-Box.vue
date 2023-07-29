<template lang="pug">
div.relative
  button.flex.items-center.justify-between.border.border.border-gray-500.px-4.py-2.bg-white.w-20.rounded-t-lg(
    :class="{ 'rounded-b-lg': !pickerOpen }"
    @click="togglePicker"
  )
    p(v-if="modelValue !== undefined") {{ modelValue }}
    p(v-else) {{ placeHolder || '--' }}
    font-awesome-icon.text-slate-400(icon="fa-solid fa-sort")

  .absolute.bg-white.divide-y.shadow-lg.w-full.flex.flex-col.rounded-b-lg(v-if="pickerOpen")
    button(
      class=["flex", "px-4", "py-2","hover:bg-gray-200", "last:rounded-b-lg"]
      v-for="option in options" 
      :key="option.label" 
      @click="setOption(option.value)") 
      p {{ option.label }}
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
defineProps<{
  options: {
    label: string;
    value: T;
  };
  placeHolder?: string;
  modelValue: T;
}>();

const emit = defineEmits(['update:modelValue']);

const pickerOpen = ref(false);

function togglePicker() {
  pickerOpen.value = !pickerOpen.value;
}

function setOption(optionValue: T) {
  emit('update:modelValue', optionValue);
  pickerOpen.value = false;
}
</script>

<style scoped></style>
