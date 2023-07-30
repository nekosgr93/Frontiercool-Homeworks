import { defineStore } from 'pinia';
import { reactive } from 'vue';

type PageSeeds = {
  [page: number]: string;
};

export const usePageSettingStore = defineStore('page-setting', () => {
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

  return { getPageSeed, setPageSeed };
});
