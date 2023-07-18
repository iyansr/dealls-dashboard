import { getAllCarts } from '@/api/cart';
import { useQuery } from '@tanstack/react-query';

export const useQueryFetchCarts = () => {
  return useQuery(['carts'], {
    queryFn: async () => {
      const response = await getAllCarts();
      return response;
    },
    keepPreviousData: true,
  });
};
