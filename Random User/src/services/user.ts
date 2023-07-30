import axios from 'axios';
import type { UserApiResult } from '../types/user';

const userServer = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

export async function getUserList(page: number, size: number, seed?: string) {
  const result = await userServer.get<UserApiResult>('', {
    params: {
      page,
      results: size,
      seed,
    },
  });
  return result.data;
}
