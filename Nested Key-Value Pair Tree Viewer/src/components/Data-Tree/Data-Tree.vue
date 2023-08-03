<template lang="pug">
.flex.flex-1.text-xl
  ul.list-none.list-inside()
    TreeNode(v-for="key in Object.keys(dataTree)" :key="key" :data-key="key" :data-value="dataTree[key]")
</template>

<script setup lang="ts">
import TreeNode from './Tree-Node.vue';
import type { DataTreeType } from '@/helpers/tree-parser';
const props = defineProps<{
  dataTree: DataTreeType;
}>();
</script>

<style scoped></style>
