import { computed } from 'vue';
import type { UserItem } from '../user-item';
import AddFavoriteBtn from './Add-Favorite-Button.vue';
import RemoveFavoriteBtn from './Remove-Favorite-Button.vue';
import { useFavoriteUsersStore } from '@/stores';
const props = defineProps<UserItem>();
const emit = defineEmits(['item-click']);
const favoriteStore = useFavoriteUsersStore();
const favorited = computed(() => !!favoriteStore.favoriteUsers[props.id]);
