<template lang="pug">
.flex.flex-1.flex-col.justify-center.items-center(v-if="!isLoading && users")
  .flex.flex-col.space-y-6.px-20(class=["2xl:w-9/12"])
    .flex.flex-row.w-full.justify-end
      p.text-lg {{ resultCounter.start }} - {{ resultCounter.end }} of {{ itemTotal }} Results
    List(
      :users="users"
      :list-type="pageStore.pageSetting.listType"
    )
  .fixed.bottom-0.w-full
    .flex.flex-1.items-center.justify-center.py-4.bg-slate-100
      EllpsisPagination(:page-length="pageLength" v-model="currentPage")
div(v-else) Loading
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserList } from '../services/user';
import List from '@/components/lists/Generic-List.vue';
import EllpsisPagination from '@/components/pagination/Ellipsis-Pagination.vue';
import type { UserItem } from '@/components/items/user-item';
import { useFavoriteUsersStore, usePageSettingStore } from '@/stores';

const pageStore = usePageSettingStore();
const favoriteStore = useFavoriteUsersStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const itemTotal = 3310;

const users = ref<UserItem[]>();
const pageLength = computed(() => Math.ceil(itemTotal / pageStore.pageSetting.pageSize!));
const currentPage = computed({
  get: () => parseInt(route.query.page as string) || 1,
  set: newPage => {
    router.push({
      name: 'user-list',
      query: {
        page: newPage,
        pageSize: pageStore.pageSetting.pageSize,
        listType: pageStore.pageSetting.listType,
      },
    });
  },
});

const resultCounter = computed<{ start: number; end: number }>(() => {
  const start = (currentPage.value - 1) * pageStore.pageSetting.pageSize! + 1;
  let end: number;
  if (currentPage.value !== pageLength.value) {
    end = currentPage.value * pageStore.pageSetting.pageSize!;
  } else {
    end = itemTotal;
  }

  return { start, end };
});

async function getUsers() {
  isLoading.value = true;
  try {
    let querySize = pageStore.pageSetting.pageSize!;
    if (currentPage.value === pageLength.value) {
      querySize = itemTotal - resultCounter.value.start;
    }
    const result = await getUserList(currentPage.value, querySize, pageStore.getPageSeed(currentPage.value));
    users.value = result.results.map(r => ({
      id: r.login.uuid,
      userName: `${r.name.first} ${r.name.last}`,
      userPhoto: {
        large: r.picture.large,
        medium: r.picture.medium,
      },
      favorite: !!favoriteStore.favoriteUsers[r.id.value],
    }));
    pageStore.setPageSeed(currentPage.value, result.info.seed);
  } finally {
    isLoading.value = false;
  }
}

watch(pageStore.pageSetting, (newSetting, oldSetting) => {
  let queryPage = currentPage.value;
  if (newSetting.pageSize !== oldSetting) {
    queryPage = 1;
  }
  router.push({
    name: 'user-list',
    query: {
      page: queryPage,
      ...newSetting,
    },
  });
});

watchEffect(() => {
  getUsers();
});
</script>

<style scoped></style>
