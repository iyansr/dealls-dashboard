import axios from '@/lib/axios';
import { Product } from '@/types/product';
import { GeneralListResponse } from '@/types/response';

type GetAllProducts = (q: string) => Promise<GeneralListResponse<Product, 'products'>>;

export const getAllProducts: GetAllProducts = async (q: string) => {
  const response = await axios.request<GeneralListResponse<Product, 'products'>>({
    method: 'GET',
    url: '/products/search',
    params: {
      limit: 100,
      skip: 0,
      q,
    },
  });

  return response.data;
};

export const getDetailProduct = async (id: number) => {
  const response = await axios.request<Product>({
    method: 'GET',
    url: `/products/${id}`,
  });

  return response.data;
};

export const getAllProductCategory = async () => {
  const response = await axios.request<string[]>({
    method: 'GET',
    url: '/products/categories',
  });

  return response.data;
};
