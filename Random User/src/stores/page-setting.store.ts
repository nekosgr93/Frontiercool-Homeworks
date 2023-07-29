import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ListDisplayType = 'grid' | 'list';

export const usePageSettingStore = defineStore('page-setting', () => {
  const pageSize = ref(30);
  const listType = ref<ListDisplayType>('grid');
  const currentPage = ref(1);

  return { pageSize, listType, currentPage };
});
