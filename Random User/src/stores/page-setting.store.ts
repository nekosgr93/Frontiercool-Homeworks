import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ListDisplayType = 'card-grid' | 'list-item';

export const usePageSettingStore = defineStore('page-setting', () => {
  const pageSize = ref(30);
  const listType = ref<ListDisplayType>('card-grid');

  return { pageSize, listType };
});
