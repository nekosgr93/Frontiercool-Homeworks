<template lang="pug">
.flex.flex-col.items-center.justify-center.bg-gray-500.p-4.rounded-lg.space-y-4.py-8.w-52(@click="$emit('item-click')")
  img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="userPhoto.large" alt='user image')
  
  .flex.flex-row.space-x-2.justify-center.items-center
    .w-36.flex.justify-center
      h1.text-gray-50.font-semibold.truncate {{ userName }}
    AddFavoriteBtn(v-if="!favorited" size="medium" @add-favorite="favoriteStore.addToFavorites(id, userName, userPhoto)")
    RemoveFavoriteBtn(v-else size="medium" @remove-favorite="favoriteStore.removeFromFavorites(id)")
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
