<template lang="pug">
.flex.flex-1.justify-center.items-center(v-if="!isLoading && users")
  .flex(class=["2xl:w-9/12"])
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
const totlaLength = 3310;

const users = ref<UserItem[]>();
const pageLength = ref(Math.ceil(totlaLength / pageStore.pageSetting.pageSize!));
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

async function getUsers() {
  isLoading.value = true;
  try {
    const result = await getUserList(
      currentPage.value,
      pageStore.pageSetting.pageSize!,
      pageStore.getPageSeed(currentPage.value),
    );
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

watch(pageStore.pageSetting, newSetting => {
  router.push({
    name: 'user-list',
    query: {
      page: currentPage.value,
      ...newSetting,
    },
  });
});

watchEffect(() => {
  getUsers();
});
</script>

<style scoped></style>
