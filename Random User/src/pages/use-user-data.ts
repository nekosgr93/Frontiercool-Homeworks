import type { UserItem } from '@/components/items/user-item';
import { InjectionKey, Ref } from 'vue';

type UserData = {
  getUsers: (currentPage: number, pageSize: number) => Promise<void>;
  users: Ref<UserItem[] | undefined>;
  totalPages: Ref<number | undefined>;
  totalItems: Ref<number | undefined>;
};

export const UserDataKey: InjectionKey<UserData> = Symbol();
