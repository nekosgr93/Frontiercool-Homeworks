<script setup lang="ts">
import type { HeaderPage, ListDisplayType } from "./page.type";
import { ref } from "vue";
import { mdiViewGrid, mdiFormatListBulleted } from '@mdi/js';

withDefaults(
  defineProps<{
    pageSize?: number;
    listType?: ListDisplayType;
  }>(),
  {
    pageSize: 30,
    listType: "card-grid",
  },
);
const emit = defineEmits([
  "tab-change",
  "page-size-change",
  "list-type-change",
]);

const pages: HeaderPage[] = [
  {
    label: "All",
  },
  {
    label: "Favorite",
  },
];

const currentTabIndex = ref<number>(0);
</script>

<template lang="pug">
.flex.flex-1.flex-row.justify-between.px-10.py-4.bg-sky-950
  .space-x-4.items-center
    //- HeaderTab(
    //-   v-for="(page, index) in pages"
    //-   :key="page.title" 
    //-   :title="page.title"
    //-   :active="index === currentTabIndex"
    //-   @click="currentTabIndex = index")
    v-tabs(v-model="currentTabIndex" @update:modelValue="$emit('tab-change', currentTabIndex)")
      v-tab(v-for="(page, index) in pages" :key="page.label" :value="index" color="orange-darken-4") {{ page.label }}
    
  .space-x-4.items-center.flex.flex-row.justify-center
    .w-28
      v-select(
        label="page size"
        variant="solo-filled"
        bg-color="bg-slate-400"
        :items="[10, 30, 50]"
        :hide-details="true"
        :model-value="pageSize"
        @update:modelValue="(size) => $emit('page-size-change', size)"
      )
    v-btn-toggle(:model-value="listType" @update:modelValue="(type) => $emit('list-type-change', type)")
      v-btn(:icon="mdiViewGrid" value="card-grid")
      v-btn(:icon="mdiFormatListBulleted" value="list-item")

</template>

<style scoped></style>
