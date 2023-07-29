<script setup lang="ts">
import { computed } from 'vue';
import { usePageSettingStore } from '@/stores/page-setting.store';
import EllpsisPagination from '../pagination/Ellipsis-Pagination.vue';
defineProps<{
  pageLength: number;
}>();

const pageStore = usePageSettingStore();

const currentPage = computed({
  get: () => pageStore.currentPage,
  set: v => pageStore.$patch({ currentPage: v }),
});
</script>

<template lang="pug">
.flex.flex-1.items-center.justify-center.py-4.bg-cyan-700
  EllpsisPagination(:page-length="pageLength" v-model="currentPage")
</template>

<style scoped></style>
