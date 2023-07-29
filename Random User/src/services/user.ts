import axios from 'axios';
import type { UserApiResult } from '../types/user';

const userServer = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

export async function getUserList(page: number, results: number, seed?: string) {
  const result = await userServer.get<UserApiResult>('', {
    params: {
      page,
      results,
      seed,
    },
  });
  return result.data;
}

export async function getUserDetail(id: string) {
  const result = await userServer.get<UserApiResult>('', {
    params: {
      seed: id,
    },
  });
  return result.data;
}
