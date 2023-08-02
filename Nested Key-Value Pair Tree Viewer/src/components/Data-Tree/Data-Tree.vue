<template lang="pug">
.flex.flex-1.text-xl
  ul.list-none.list-inside
    TreeNode(v-for="key in Object.keys(dataTree)" :key="key" :data-key="key" :data-value="dataTree[key]")
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import TreeNode from './Tree-Node.vue';
import { treeParser } from '@/helpers/tree-parser';
const props = defineProps<{
  dataPairs: string[][];
}>();

const dataTree = computed(() => treeParser(props.dataPairs));

watchEffect(() => console.log(dataTree.value))
</script>

<style scoped></style>
