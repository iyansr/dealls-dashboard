import { getAllCarts } from '@/api/cart';
import { getUserById } from '@/api/user';
import { RequestParams } from '@/types/request';
import { useQuery } from '@tanstack/react-query';

export const useQueryFetchCarts = (params: RequestParams) => {
  return useQuery(['carts', params], {
    queryFn: async () => {
      const response = await getAllCarts({
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
      });
      const responseWithUser = await Promise.all(
        response.carts.map(async cart => {
          const user = await getUserById(cart.userId);
          return {
            ...cart,
            user: {
              id: user.id,
              name: user.firstName + ' ' + user.lastName,
            },
          };
        }),
      );

      const totalPages = Math.ceil(response.total / params.pageSize);

      return {
        carts: responseWithUser,
        totalPages,
      };
    },
    keepPreviousData: true,
  });
};
