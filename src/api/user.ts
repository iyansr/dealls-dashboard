import axios from '@/lib/axios';
import { User } from '@/types/user';

export const getUserById = async (id: number) => {
  const response = await axios.request<User>({
    method: 'GET',
    url: `/users/${id}`,
  });

  return response.data;
};
