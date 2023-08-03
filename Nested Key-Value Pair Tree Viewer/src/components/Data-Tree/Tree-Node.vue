<template lang="pug">
li.flex.space-x-2.my-1(:class="{ 'flex-col': hasNestedValue }")
  .flex.flex-row.space-x-1
    p {{ `${dataKey}: `  }}
    template(v-if="hasNestedValue")
      button(v-if="blockCollopse" @click="blockCollopse = false") [+]
      button(v-else @click="blockCollopse = true") [-]

  template(v-if="hasNestedValue")
    ul.list-none.list-inside.pl-14(v-if="!blockCollopse")
      TreeNode(v-for="key in Object.keys(dataValue)" :key="key" :data-key="key" :data-value="dataValue[key]")
  template(v-else)
    p.text-red-300 {{ dataValue }}
</template>

<script setup lang="ts">
import type { DataTreeType } from '@/helpers/tree-parser';
import { computed, ref } from 'vue';

const props = defineProps<{ dataKey: string; dataValue: string | DataTreeType }>();

const blockCollopse = ref(false);
const hasNestedValue = computed(() => typeof props.dataValue === 'object');
</script>

<style scoped></style>
