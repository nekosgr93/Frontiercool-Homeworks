import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ListDisplayType } from '@/types/page-setting';

export function useRouteInfo() {
  const route = useRoute();
  const currentPage = ref<number>();

  const pageSize = ref<number>();
  const listType = ref<ListDisplayType>();

  const name = ref<string>();

  watch(
    () => route.query.page,
    () => {
      const queryPage = route.query.page;
      if (queryPage) {
        const page = parseInt(queryPage as string);
        if (page) {
          currentPage.value = page;
        } else {
          currentPage.value = 1;
        }
      } else {
        currentPage.value = 1;
      }
    },
    { immediate: true },
  );

  watch(
    () => route.query.pageSize,
    () => {
      const queryPageSize = route.query.pageSize;
      if (queryPageSize && parseInt(queryPageSize as string)) {
        const size = parseInt(queryPageSize as string);
        if (size && [10, 30, 50].includes(size)) {
          pageSize.value = size;
        } else {
          pageSize.value = 30;
        }
      } else {
        pageSize.value = 30;
      }
    },
    { immediate: true },
  );

  watch(
    () => route.query.listType,
    () => {
      const queryListType = route.query.listType;
      if (queryListType === 'grid' || queryListType === 'list') {
        listType.value = queryListType;
      } else {
        listType.value = 'grid';
      }
    },
    { immediate: true },
  );

  watch(
    () => route.name,
    () => {
      const queryName = route.name;
      name.value = queryName as string;
    },
    { immediate: true },
  );

  return { currentPage, pageSize, listType, name };
}
