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
        v-model="currentPageSize")
    ListTypeTab(:options=[{ icon: 'grip', value: 'grid' }, { icon: 'list', value: 'list' }] v-model="currentListType")

</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { NavTabType } from '../tabs/nav-tab.type';
import { useRouter } from 'vue-router';
import { useRouteInfo } from '@/composables/use-route-info';
import TabsGroup from '../tabs/Tabs-Group.vue';
import SelectBox from '../select-box/Select-Box.vue';
import ListTypeTab from './List-Type-Tab.vue';

const pages: NavTabType[] = [
  {
    label: 'All',
    navTo: 'user-list',
  },
  {
    label: 'Favorite',
    navTo: 'favorite-users',
  },
];
const router = useRouter();
const { currentPage, pageSize, listType } = useRouteInfo();

const currentTabIndex = ref<number>(0);

const currentPageSize = computed({
  get: () => pageSize.value,
  set: newSize =>
    router.push({
      name: pages[currentTabIndex.value].navTo,
      query: {
        page: 1,
        pageSize: newSize,
        listType: listType.value,
      },
    }),
});

const currentListType = computed({
  get: () => listType.value,
  set: newType =>
    router.push({
      name: pages[currentTabIndex.value].navTo,
      query: {
        page: currentPage.value,
        pageSize: pageSize.value,
        listType: newType,
      },
    }),
});

watch(currentTabIndex, (newIndex: number) => {
  router.push({
    name: pages[newIndex].navTo,
    query: {
      page: 1,
      pageSize: pageSize.value,
      listType: listType.value,
    },
  });
});
</script>

<style scoped></style>
../tabs/nav-tab.type
