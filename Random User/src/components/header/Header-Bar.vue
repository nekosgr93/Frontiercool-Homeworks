<script setup lang="ts">
import type { Tab } from '../tabs/tab.type';
import { usePageSettingStore } from '@/stores/page-setting.store';
import TabsGroup from '../tabs/Tabs-Group.vue';
import SelectBox from '../select-box/Select-Box.vue';
import ListTypeTab from './List-Type-Tab.vue';
import { ref, computed } from 'vue';

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

const pageSize = computed({
  get: () => pageStore.pageSize,
  set: v => pageStore.$patch({ pageSize: v }),
});

const listType = computed({
  get: () => pageStore.listType,
  set: v => pageStore.$patch({ listType: v }),
});
</script>

<template lang="pug">
.flex.flex-1.flex-row.justify-between.px-10.py-4.bg-sky-950
  .space-x-4.flex.items-end
    TabsGroup(:tabs="pages" v-model="currentTabIndex")
    
  .space-x-4.items-center.flex.flex-row.justify-center
    .flex.flex-row.space-x-2.items-center
      .flex.flex-1.justify-center
        p.text-white.align-middle Show:
      SelectBox(
        :options="[10, 30, 50].map(v => ({ label: v.toString(), value: v }))" 
        v-model="pageSize")
    ListTypeTab(:options=[{ icon: 'grip', value: 'grid' }, { icon: 'list', value: 'list' }] v-model="listType")

</template>

<style scoped></style>
