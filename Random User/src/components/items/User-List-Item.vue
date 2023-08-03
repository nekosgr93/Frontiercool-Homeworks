<template lang="pug">
.flex.flex-row.bg-white.px-10.rounded-lg.py-8.justify-between.items-center.text-sky-950.drop-shadow-md(
  class=["hover:bg-sky-950/10"]
  @click="$emit('item-click')"
)
  .flex.space-x-8
    img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="userPhoto.medium" alt='user image')
    .flex.justify-start.items-center
      h1.font-semibold {{ userName }}
  HoverTooltip(v-if="!favorited" text="Add to favorites" position="left")
    AddFavoriteBtn(size="large" @add-favorite="favoriteStore.addToFavorites(id, userName, userPhoto)")
  HoverTooltip(v-else text="Remove from varorites" position="left")
    RemoveFavoriteBtn(size="large" @remove-favorite="favoriteStore.removeFromFavorites(id)")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { UserItem } from './user-item';
import AddFavoriteBtn from './Add-Favorite-Button.vue';
import RemoveFavoriteBtn from './Remove-Favorite-Button.vue';
import HoverTooltip from '@/components/tooltip/Hover-Tooltip.vue';
import { useFavoriteUsersStore } from '@/stores';
const props = defineProps<UserItem>();
defineEmits(['item-click']);
const favoriteStore = useFavoriteUsersStore();
const favorited = computed(() => !!favoriteStore.favoriteUsers[props.id]);
</script>

<style scoped></style>
