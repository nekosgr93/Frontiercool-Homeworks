<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import CardList from "./lists/Card-List.vue";
import HeaderBar from "./header/Header-Bar.vue";
import PageFooter from "./footer/Page-Footer.vue";
import type { User } from "../types/user";
import { getUserList } from "../services/user";
import type { ListDisplayType } from "./header/page.type";

const users = ref<User[]>();
const pageSize = ref(30);
const listType = ref<ListDisplayType>("card-grid");
const itemTotal = 3310;
const totalPages = ref(3310 / pageSize.value);

onMounted(async () => {
  const result = await getUserList(1, 30);
  users.value = result.results;
});
</script>

<template lang="pug">
.flex.flex-col.flex-1.h-screen.overflow-y-auto.w-screen
  header.fixed.top-0.w-screen
    HeaderBar(
      :page-size="pageSize" 
      :list-type="listType"
      @tab-change="console.log" 
      @page-size-change="size => pageSize = size" 
      @list-type-change="t => listType = t"
    )
  main.flex.flex-1.justify-center.pt-32.pb-32
    div(v-if="users")
      card-list(v-if="listType === 'card-grid'" :users="users")
  footer.fixed.bottom-0.w-screen
    PageFooter(
      :page-length=totalPages
    )
</template>

<style scoped></style>
