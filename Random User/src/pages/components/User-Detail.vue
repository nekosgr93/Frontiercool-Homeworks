<template lang="pug">
.flex.flex-col.py-2.px-3.bg-slate-100.rounded-lg.space-y-1.text-sky-950(class=["w-[400px]"])
  .flex.justify-end
    button.flex.items-center.justify-center(@click="$emit('close')")
      font-awesome-icon.text-xl(:icon="['fas', 'xmark']" class=["hover:text-slate-500"])
  .flex.flex-col.flex-1.space-y-4.items-center.p-4
    img.rounded-lg(:src="userPhoto.large" class=["w-[200px]"])
    h1.text-2xl {{ userName }}

    button.flex.flex-row.p-4.rounded-lg.border.border-red-500.text-red-500.items-center.space-x-2(
      v-if="isFavorited"
      class=["hover:border-0", "hover:bg-slate-400", "hover:text-white"]
      @click="favoriteStore.removeFromFavorites(id)"
    )
      p.text-xl Remove from favorites
      font-awesome-icon.text-2xl(:icon="['fas', 'heart']")
    button.flex.flex-row.p-4.rounded-lg.bg-red-500.text-white.items-center.space-x-2(
      v-else
      class=["hover:bg-red-400"]
      @click="favoriteStore.addToFavorites(id, userName, userPhoto)"
    )
      p.text-xl Add to favorites
      font-awesome-icon.text-2xl(:icon="['far', 'heart']")

</template>

<script setup lang="ts">
import type { UserItem } from '@/components/items/user-item';
import { useFavoriteUsersStore } from '@/stores';
import { computed } from 'vue';

const props = defineProps<UserItem>();
const favoriteStore = useFavoriteUsersStore();
const isFavorited = computed(() => !!favoriteStore.favoriteUsers[props.id]);
defineEmits(['close']);
</script>

<style scoped></style>
