<template lang="pug">
div
  .flex.flex-1.flex-row.space-x-4
    div(v-for="(tab, index) in tabs" :key="tab.label" :ref="el => tabRefs[index] = el")
      CustomTab(
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
      'rounded-t-full',
      'h-1'
    ]
    :style="indicatorStyle"
  )

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { Tab } from './tab.type';
import CustomTab from './Custom-Tabs.vue';

const props = defineProps<{
  tabs: Tab[];
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
  if (newTabIndex !== props.modelValue) {
    moveIndicator(newTabIndex);
    emit('update:modelValue', newTabIndex);
  }
}

onMounted(() => {
  moveIndicator(0);
});
</script>

<style scoped></style>
