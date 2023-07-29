<script setup lang="ts">
import type { Tab } from '../tabs/tab.type';
import { usePageSettingStore, type ListDisplayType } from '@/stores/page-setting.store';
import TabsGroup from '../tabs/Tabs-Group.vue';
import { ref, watch } from 'vue';
import { mdiViewGrid, mdiFormatListBulleted } from '@mdi/js';

const pages: Tab[] = [
  {
    label: 'All',
  },
  {
    label: 'Favorite',
  },
];

const currentTabIndex = ref<number>(0);
const pageStore = usePageSettingStore();

</script>

<template lang="pug">
.flex.flex-1.flex-row.justify-between.px-10.py-4.bg-sky-950
  .space-x-4.items-center
    TabsGroup(:tabs="pages" v-model="currentTabIndex")
    //- v-tabs(v-model="currentTabIndex" @update:modelValue="$emit('tab-change', currentTabIndex)")
    //-   v-tab(v-for="(page, index) in pages" :key="page.label" :value="index" color="orange-darken-4") {{ page.label }}
    
  .space-x-4.items-center.flex.flex-row.justify-center
    .w-28
    //-   v-select(
    //-     label="page size"
    //-     variant="solo-filled"
    //-     bg-color="bg-slate-400"
    //-     :items="[10, 30, 50]"
    //-     :hide-details="true"
    //-     :model-value="pageSize"
    //-     @update:modelValue="(size) => $emit('page-size-change', size)"
    //-   )
    //- v-btn-toggle(:model-value="listType" @update:modelValue="(type) => $emit('list-type-change', type)")
    //-   v-btn(:icon="mdiViewGrid" value="card-grid")
    //-   v-btn(:icon="mdiFormatListBulleted" value="list-item")

</template>

<style scoped></style>
