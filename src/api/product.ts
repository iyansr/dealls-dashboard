import { Product } from '@/types/product';
import { GeneralListResponse } from '@/types/response';

export const getAllProducts = async (): Promise<GeneralListResponse<Product, 'products'>> => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await response.json();

  return json;
};
