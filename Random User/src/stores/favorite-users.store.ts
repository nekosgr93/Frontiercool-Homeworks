import { reactive } from 'vue';
import { defineStore } from 'pinia';

type FavoriteUser = {
  [id: string]:
    | {
        userName: string;
        userPhoto: {
          large: string;
          medium: string;
        };
      }
    | undefined;
};

export const useFavoriteUsersStore = defineStore('favorite-users', () => {
  const favoriteUsers = reactive<FavoriteUser>({});

  function addToFavorites(id: string, userName: string, userPhoto: { large: string; medium: string }) {
    favoriteUsers[id] = {
      userName,
      userPhoto,
    };
  }

  function removeFromFavorites(id: string) {
    delete favoriteUsers[id];
  }

  return { favoriteUsers, addToFavorites, removeFromFavorites };
});
