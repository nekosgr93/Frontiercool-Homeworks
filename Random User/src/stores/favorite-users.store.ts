import { reactive } from 'vue';
import { defineStore } from 'pinia';

type FavoriteUser = {
  [id: string]: {
    userName: string;
    userPhoto: {
      large: string;
      medium: string;
    };
  };
};

export const useFavoriteUsersStore = defineStore('favorite-users', () => {
  const favoriteUsers = reactive<FavoriteUser>({});

  return { favoriteUsers };
});
