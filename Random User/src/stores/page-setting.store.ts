import type { ListDisplayType } from '@/types/page-setting';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

type PageSeeds = {
  [page: number]: string;
};

export const usePageSettingStore = defineStore('page-setting', () => {
  const route = useRoute();
  const queryPageSize = route.query.pageSize;
  const queryListType = route.query.listType;
  let defaultPageSize: number;
  let defaultListType: ListDisplayType;

  if (queryPageSize && parseInt(queryPageSize as string)) {
    defaultPageSize = parseInt(queryPageSize as string);
  } else {
    defaultPageSize = 30;
  }

  if (queryListType === 'grid' || queryListType === 'list') {
    defaultListType = queryListType;
  } else {
    defaultListType = 'grid';
  }

  const pageSetting = reactive<{
    pageSize?: number;
    listType?: ListDisplayType;
  }>({
    pageSize: defaultPageSize,
    listType: defaultListType,
  });

  const pageSeeds = reactive<PageSeeds>({});

  function getPageSeed(page: number) {
    const seed = pageSeeds[page];

    if (!seed) {
      const storedSeed = localStorage.getItem(`page-seed-${page}`);
      if (storedSeed) {
        return storedSeed;
      } else {
        return undefined;
      }
    }
    return seed;
  }

  function setPageSeed(page: number, seed: string) {
    pageSeeds[page] = seed;
    localStorage.setItem(`page-seed-${page}`, seed);
  }

  return { pageSetting, getPageSeed, setPageSeed };
});
