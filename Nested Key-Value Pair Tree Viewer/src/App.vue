<template lang="pug">
.p-8.bg-gray-900.text-slate-300.h-screen.w-full.space-y-4.flex.flex-col
  h1.text-2xl.bold Nested Key-Value Pair Tree Viewer

  .flex.flex-1.flex-row.space-x-8.grow
    MainContainer.items-center.space-y-4
      .flex.flex-row.space-x-4.items-center.justify-center.w-full(v-for="(pair, i) in keyValuePairs" :key="i")
        InputBlock(v-model="pair[0]")
        InputBlock(v-model="pair[1]")
        FormButton(@btn-click="removePair(i)").w-10.h-10 -
      FormButton(class=["w-1/2"] @btn-click="addPair") + Add new pair
    MainContainer
      DataTree(:data-pairs="keyValuePairs")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MainContainer, InputBlock, FormButton, DataTree } from './components';

const keyValuePairs = ref<string[][]>([
  ['books.hello world', 'good'],
  ['books.receipt', 'nice'],
]);

function addPair() {
  keyValuePairs.value.push([]);
}

function removePair(index: number) {
  keyValuePairs.value = keyValuePairs.value.filter((_, i) => i !== index);
}
</script>

<style scoped></style>
