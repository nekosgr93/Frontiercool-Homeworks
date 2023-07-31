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
  const storedData = localStorage.getItem('favorite-users');

  if (storedData) {
    Object.assign(favoriteUsers, JSON.parse(storedData));
  }

  function addToFavorites(id: string, userName: string, userPhoto: { large: string; medium: string }) {
    favoriteUsers[id] = {
      userName,
      userPhoto,
    };
    localStorage.setItem('favorite-users', JSON.stringify(favoriteUsers));
  }

  function removeFromFavorites(id: string) {
    delete favoriteUsers[id];
    localStorage.setItem('favorite-users', JSON.stringify(favoriteUsers));
  }

  return { favoriteUsers, addToFavorites, removeFromFavorites };
});
