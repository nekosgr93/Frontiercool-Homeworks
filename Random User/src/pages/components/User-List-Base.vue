<template lang="pug">
.flex.flex-1.justify-center.items-center(v-if="!isLoading")
  .flex.flex-col.justify-center.items-center.space-y-6.px-20(v-if="userData.users.value.length > 0")
    .flex.flex-row.justify-end.w-full
      p.text-lg {{ resultCounter.start }} - {{ resultCounter.end }} of {{ userData.totalItems }} Results
    GridList(v-if="listType === 'grid'" :users="userData.users.value")
    RegularList(v-else :users="userData.users.value" class=["sm:min-w-[500px]", "md:min-w-[800px]", "lg:min-w-[1000px]"])
    .fixed.bottom-0.w-full
      .flex.flex-1.items-center.justify-center.py-4.bg-slate-100
        EllpsisPagination(:page-length="userData.totalPages.value" v-model="currentPage")
  .flex.items-center.justify-center(v-else) 
    p.text-xl {{  emptyMessage }}
div(v-else) Loading
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { GridList, RegularList } from '@/components/lists';
import EllpsisPagination from '@/components/pagination/Ellipsis-Pagination.vue';
import { UserDataKey } from '../use-user-data';
import { useRouteInfo } from '@/composables/use-route-info';

withDefaults(
  defineProps<{
    emptyMessage?: string;
  }>(),
  {
    emptyMessage: 'No data',
  },
);

const userData = inject(UserDataKey);
const { pageSize, listType } = useRouteInfo();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);

const currentPage = computed({
  get: () => parseInt(route.query.page as string) || 1,
  set: newPage => {
    router.push({
      name: route.name!,
      query: {
        page: newPage,
        pageSize: pageSize.value,
        listType: listType.value,
      },
    });
  },
});

const resultCounter = computed<{ start: number; end: number }>(() => {
  const start = (currentPage.value - 1) * pageSize.value! + 1;
  let end: number;
  if (currentPage.value !== userData?.totalPages.value) {
    end = currentPage.value * pageSize.value!;
  } else {
    end = userData.totalItems.value!;
  }

  return { start, end };
});

watchEffect(async () => {
  try {
    isLoading.value = true;
    await userData!.getUsers(currentPage.value, pageSize.value!);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>
../user-context
