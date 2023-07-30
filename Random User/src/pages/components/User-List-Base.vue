<template lang="pug">
.flex.flex-1(v-if="!isLoading")
  .flex.flex-1.flex-col.justify-center.items-center(v-if="userData.users.value.length > 0")
    .flex.flex-col.space-y-6.px-20(class=["w-8/12"])
      .flex.flex-row.justify-end
        p.text-lg {{ resultCounter.start }} - {{ resultCounter.end }} of {{ userData.totalItems }} Results
      List(
        :users="userData.users.value"
        :list-type="listType"
      )
    .fixed.bottom-0.w-full
      .flex.flex-1.items-center.justify-center.py-4.bg-slate-100
        EllpsisPagination(:page-length="userData.totalPages.value" v-model="currentPage")
  div(v-else) {{  emptyMessage }}
div(v-else) Loading
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import List from '@/components/lists/Generic-List.vue';
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
