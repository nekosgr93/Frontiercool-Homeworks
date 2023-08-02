<template lang="pug">
.flex.flex-1(v-if="!isLoading")
  .flex.flex-1.flex-col.justify-center.items-center(v-if="userData.users.value.length > 0")
    .flex.flex-1.flex-col.items-center.space-y-6.px-20.py-12.w-fit
      .flex.flex-row.justify-end.w-full
        p.text-lg {{ resultCounter.start }} - {{ resultCounter.end }} of {{ userData.totalItems }} Results
      GridList(v-if="listType === 'grid'")
        UserCard(
          v-for="(user, index) in userData.users.value" 
          :key="user.id" 
          :id="user.id"
          :user-name="user.userName"
          :user-photo="user.userPhoto"
          @item-click="showUserDetail(index)"
        )
      RegularList(v-else :users="userData.users.value" class=["sm:min-w-[500px]", "md:min-w-[800px]", "lg:min-w-[1000px]"])
        UserListItem(
          v-for="(user, index) in userData.users.value" 
          :key="user.id" 
          :id="user.id"
          :user-name="user.userName"
          :user-photo="user.userPhoto"
          class=["w-full"]
          @item-click="showUserDetail(index)"
        )
      Modal(:show="modalOpen" @backdrop-click="closeModal")
        UserDetail(
          :id="selectedUserIndex.id"
          :user-name="selectedUserIndex.userName"
          :user-photo="selectedUserIndex.userPhoto"
          @close="closeModal"
        )
    .sticky.bottom-0.w-full
      .flex.flex-1.items-center.justify-center.py-4.bg-slate-100
        EllpsisPagination(:page-length="userData.totalPages.value" v-model="currentPage")
  .flex.flex-1.items-center.justify-center(v-else) 
    p.text-xl {{  emptyMessage }}
.flex.flex-col.items-center.justify-center.space-y-4(v-else)
  LoadingSpinner
  h1.text-xl.font-medium Loading
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Modal from '@/components/modal/Modal-Dialog.vue';
import { GridList, RegularList } from '@/components/lists';
import { UserCard, UserListItem } from '@/components/items';
import UserDetail from './User-Detail.vue';
import EllpsisPagination from '@/components/pagination/Ellipsis-Pagination.vue';
import LoadingSpinner from '@/components/spinners/Loading-Spinner.vue';
import { UserDataKey } from '../use-user-data';
import { useRouteInfo } from '@/composables/use-route-info';
import { useModal } from '@/composables/use-model';
import type { UserItem } from '@/components/items/user-item';

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
const { modalOpen, showModal, closeModal } = useModal();
const isLoading = ref(true);
const selectedUserIndex = ref<UserItem>();

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

function showUserDetail(index: number) {
  selectedUserIndex.value = userData?.users.value![index];
  showModal();
}

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
