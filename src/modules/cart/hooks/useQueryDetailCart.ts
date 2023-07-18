import { getDetailCart } from '@/api/cart';
import { getDetailProduct } from '@/api/product';
import { getUserById } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const useQueryDetailCart = (id: number) => {
  return useQuery(['detail-cart', id], {
    queryFn: async () => {
      const response = await getDetailCart(id);
      const user = await getUserById(response.userId);
      const completeResponse = {
        ...response,
        //   productDetail: await Promise.all(
        //     response.products.map(async product => {
        //       const productDetail = await getDetailProduct(product.id);
        //       return productDetail;
        //     }),
        //   ),
        products: await Promise.all(
          response.products.map(async product => {
            return {
              ...product,
              ...(await getDetailProduct(product.id)),
            };
          }),
        ),
        user: {
          id: user.id,
          name: user.firstName + ' ' + user.lastName,
        },
      };

      console.log({ completeResponse });

      return completeResponse;
    },
    keepPreviousData: true,
  });
};
