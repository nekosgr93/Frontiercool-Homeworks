<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import CardList from './lists/Card-List.vue';
import HeaderBar from './header/Header-Bar.vue';
import PageFooter from './footer/Page-Footer.vue';
import type { User } from '../types/user';
import { getUserList } from '../services/user';
import { usePageSettingStore } from '@/stores/page-setting.store';

const users = ref<User[]>();
const pageStore = usePageSettingStore();

const itemTotal = 3310;
const totalPages = ref(Math.ceil(3310 / pageStore.pageSize));
onMounted(async () => {
  const result = await getUserList(1, 30);
  users.value = result.results;
});
</script>

<template lang="pug">
.flex.flex-col.flex-1.h-screen.overflow-y-auto.w-screen
  header.fixed.top-0.w-screen
    HeaderBar
  main.flex.flex-1.justify-center.pt-32.pb-32
    div(v-if="users")
      card-list(v-if="pageStore.listType === 'card-grid'" :users="users")
  footer.fixed.bottom-0.w-screen
    PageFooter(
      :page-length="totalPages"
    )
</template>

<style scoped></style>
