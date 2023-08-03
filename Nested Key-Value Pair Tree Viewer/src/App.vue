<template lang="pug">
.p-8.bg-gray-900.text-slate-300.min-h-screen.w-full.space-y-4.flex.flex-col
  h1.text-2xl.bold Nested Key-Value Pair Tree Viewer

  .flex.flex-1.flex-row.space-x-8.grow
    MainContainer.items-center.space-y-4
      .flex.flex-row.space-x-4.justify-center.w-full(v-for="(pair, i) in keyValuePairs" :key="i")
        InputBlock(v-model="pair[0]" :error-message="parsingError && parsingError.pairIndex === i ? parsingError.message : undefined")
        InputBlock(v-model="pair[1]")
        FormButton(@btn-click="removePair(i)") -
      FormButton(class=["w-1/2"] @btn-click="addPair") + Add new pair
    MainContainer
      DataTree(v-if="!parsingError" :data-tree="dataTree")
      .flex.flex-col.space-y-2(v-else)
        h1.text-xl.text-red-400 Parsing Error!
        p {{ parsingError.message }}
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { type DataTreeType, treeParser } from '@/helpers/tree-parser';
import { MainContainer, InputBlock, FormButton, DataTree } from './components';
import { ParsingError } from './erros/paring.error';

const keyValuePairs = ref<string[][]>([
  ['books.hello world', 'good'],
  ['books.receipt', 'nice'],
]);
const parsingError = ref<{ pairIndex: number; message: string } | undefined>();

function addPair() {
  keyValuePairs.value.push([]);
}

function removePair(index: number) {
  keyValuePairs.value = keyValuePairs.value.filter((_, i) => i !== index);
}

const dataTree = ref<DataTreeType>();

watchEffect(() => {
  try {
    parsingError.value = undefined;
    dataTree.value = treeParser(keyValuePairs.value);
  } catch (err) {
    if (err instanceof ParsingError) {
      parsingError.value = {
        message: err.message,
        pairIndex: err.pairInputIndex,
      };
    } else {
      throw err;
    }
  }
});
</script>

<style scoped></style>
