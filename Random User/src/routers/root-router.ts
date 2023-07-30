import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { MainPage, UserListPage, FavoritesPage, NotFound } from '@/pages';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainPage,
    redirect: {
      path: '/user-list',
      query: {
        page: 1,
        pageSize: 30,
        listType: 'grid',
      },
    },
    children: [
      {
        path: '/user-list',
        component: UserListPage,
        name: 'user-list',
      },
      {
        path: '/favorite-users',
        component: FavoritesPage,
        name: 'favorite-users',
      },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
