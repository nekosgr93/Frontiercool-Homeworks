import axios from 'axios';
import type { UserApiResult } from '../types/user';

const userServer = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

const totalItems = 3310;

export async function getUserList(page: number, size: number, seed?: string) {
  let querySize = size;
  const totalPages = Math.ceil(totalItems / size);

  if (page === totalPages) {
    // calc remain results
    querySize = totalItems - (page - 1) * size;
  }

  const result = await userServer.get<UserApiResult & { totalItems: number; totalPages: number }>('', {
    params: {
      page,
      results: querySize,
      seed,
    },
  });
  return {
    ...result.data,
    totalItems,
    totalPages,
  };
}
