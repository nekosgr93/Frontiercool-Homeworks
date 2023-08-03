<template lang="pug">
.flex.flex-col.items-center.justify-center.bg-white.p-4.rounded-lg.space-y-4.py-8.w-52.text-sky-950.drop-shadow-md(
  class=["hover:bg-sky-950/10"]
  @click.stop="$emit('item-click')"
  )
  img.rounded-full.border-gray-100.shadow-sm.w-28.h-28(:src="userPhoto.large" alt='user image')
  
  .flex.flex-row.space-x-2.justify-center.items-center
    .flex.justify-center(class=["xl:w-36"])
      h1.font-semibold.truncate {{ userName }}
    HoverTooltip(v-if="!favorited" text="Add to favorites")
      AddFavoriteBtn(size="medium" @add-favorite="favoriteStore.addToFavorites(id, userName, userPhoto)")
    HoverTooltip(v-else text="Remove from varorites")
      RemoveFavoriteBtn(size="medium" @remove-favorite="favoriteStore.removeFromFavorites(id)")
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
