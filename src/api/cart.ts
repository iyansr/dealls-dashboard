import axios from '@/lib/axios';
import { Cart } from '@/types/chart';
import { RequestParams } from '@/types/request';
import { GeneralListResponse } from '@/types/response';

export const getAllCarts = async (params: RequestParams) => {
  const response = await axios.request<GeneralListResponse<Cart, 'carts'>>({
    method: 'GET',
    url: '/carts',
    params: {
      limit: params.pageSize,
      skip: params.pageNumber * params.pageSize,
    },
  });

  return response.data;
};
