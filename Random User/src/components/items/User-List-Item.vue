<template lang="pug">
.flex.flex-row.bg-gray-500.px-10.rounded-lg.py-8.justify-between.items-center(@click="$emit('item-click')")
  .flex.space-x-2
    img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="userPhoto.medium" alt='user image')
    .flex.justify-center.items-center(class=["md:w-36"])
      h1.text-gray-50.font-semibold.truncate {{ userName }}
  AddFavoriteBtn(v-if="!favorited" size="large" @add-favorite="favoriteStore.addToFavorites(id, userName, userPhoto)")
  RemoveFavoriteBtn(v-else size="large" @remove-favorite="favoriteStore.removeFromFavorites(id)")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { UserItem } from './user-item';
import AddFavoriteBtn from './Add-Favorite-Button.vue';
import RemoveFavoriteBtn from './Remove-Favorite-Button.vue';
import { useFavoriteUsersStore } from '@/stores';
const props = defineProps<UserItem>();
const emit = defineEmits(['item-click']);
const favoriteStore = useFavoriteUsersStore();
const favorited = computed(() => !!favoriteStore.favoriteUsers[props.id]);
</script>

<style scoped></style>
