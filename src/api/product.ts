import axios from '@/lib/axios';
import { Product } from '@/types/product';
import { GeneralListResponse } from '@/types/response';

type GetAllProducts = () => Promise<GeneralListResponse<Product, 'products'>>;

export const getAllProducts: GetAllProducts = async () => {
  const response = await axios.request<GeneralListResponse<Product, 'products'>>({
    method: 'GET',
    url: '/products',
    params: {
      limit: 100,
      skip: 0,
    },
  });

  return response.data;
};
