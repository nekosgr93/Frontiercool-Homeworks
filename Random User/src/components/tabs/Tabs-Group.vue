<template lang="pug">
div
  .flex.flex-1.flex-row.space-x-4
    div(v-for="(tab, index) in tabs" :key="tab.label" :ref="el => tabRefs[index] = el")
      NavTab(
        :label="tab.label"
        :active="index === modelValue"
        @tab-select="tabChange(index)"
      )
  div(
    class=[
      'absolute',
      'bottom-2', 
      'active-tab-indicator', 
      'transition-all',
      'duration-200',
      'ease-in-out',
      'rounded-md',
      'h-1'
    ]
    :style="indicatorStyle"
  )

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watchEffect } from 'vue';
import type { NavTabType } from './nav-tab.type';
import NavTab from './Nav-Tab.vue';

const props = defineProps<{
  tabs: NavTabType[];
  modelValue?: number;
}>();

const tabRefs = ref<HTMLElement[]>([]);

const indicatorStyle = reactive({
  left: '0px',
  width: '0px',
});

const emit = defineEmits(['update:modelValue']);

function moveIndicator(tabIndex: number) {
  const currentTab = tabRefs.value[tabIndex];
  indicatorStyle.left = `${currentTab?.offsetLeft ?? 0}px`;
  indicatorStyle.width = `${currentTab?.clientWidth ?? 0}px`;
}

function tabChange(newTabIndex: number) {
  emit('update:modelValue', newTabIndex);
}

watchEffect(() => {
  moveIndicator(props.modelValue!);
});
</script>

<style scoped></style>
./nav-tab.type
