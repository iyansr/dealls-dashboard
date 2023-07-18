import axios from '@/lib/axios';
import { Cart } from '@/types/chart';
import { GeneralListResponse } from '@/types/response';

export const getAllCarts = async () => {
  const response = await axios.request<GeneralListResponse<Cart, 'carts'>>({
    method: 'GET',
    url: '/carts',
    params: {
      limit: 100,
      skip: 0,
    },
  });

  return response.data;
};
