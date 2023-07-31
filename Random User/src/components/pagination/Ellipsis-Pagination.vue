<template lang="pug">
.flex.flex-row
  button.page-button(class=["disabled:text-slate-400"] @click="$emit('update:modelValue', modelValue - 1)" :disabled="modelValue === 1")
    font-awesome-icon(:icon="['fas', 'chevron-left']")
  button.page-button(
    v-for="page in pages"
    :class="{active: page === modelValue}"
    :key="page" 
    :disabled="page === '...' || page === modelValue"
    @click="$emit('update:modelValue', page)"
    )
    p.text-xl {{ page }}
  button.page-button(class=["disabled:text-slate-400"] @click="$emit('update:modelValue', modelValue + 1)" :disabled="modelValue === pageLength")
    font-awesome-icon(:icon="['fas', 'chevron-right']")
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  pageLength: number;
  modelValue: number;
}>();

const emit = defineEmits(['update:modelValue']);

const pages = computed(() => {
  return calcPagination(props.modelValue);
});

function calcPagination(currentPage: number) {
  if (props.pageLength < 7) {
    return Array.from({ length: props.pageLength }, (_, i) => i + 1);
  } else {
    const _pages: (number | '...')[] = [1];
    const pre = currentPage - 1;
    const next = currentPage + 1;

    if (pre !== 1 && pre > 0) {
      if (pre - 1 > 1) {
        _pages.push('...');
      }
      _pages.push(pre);
    }

    if (currentPage !== 1) {
      _pages.push(currentPage);
    }

    if (next !== props.pageLength && next < props.pageLength) {
      _pages.push(next);
      if (props.pageLength - next > 1) {
        _pages.push('...');
      }
    }
    if (currentPage !== props.pageLength) {
      _pages.push(props.pageLength);
    }
    return _pages;
  }
}
</script>

<style scoped>
.page-button {
  @apply p-2 mx-2 rounded-lg hover:enabled:bg-zinc-400;
}

.active {
  @apply bg-orange-600 text-slate-100;
}
</style>
