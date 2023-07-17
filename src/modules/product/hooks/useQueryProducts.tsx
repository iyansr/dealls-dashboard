import { getAllProducts } from '@/api/product';
import { RequestParams } from '@/types/request';
import { useQuery } from '@tanstack/react-query';

const useQueryFetchProducts = () => {
  return useQuery(['products'], {
    queryFn: async () => {
      const response = await getAllProducts();
      return response;
    },
    keepPreviousData: true,
  });
};

const useQueryProducts = (params: RequestParams) => {
  const { data } = useQueryFetchProducts();

  return useQuery(['products-filtered', params, data], {
    queryFn: async () => {
      const products = data?.products ?? [];
      const total = products.length;
      const limit = params.limit ?? 0;

      const finalProducts = products.slice(params.skip ?? 0, params.skip + (limit ?? 0));

      return {
        products: finalProducts,
        total,
        limit,
      };
    },
    keepPreviousData: true,
  });
};

export default useQueryProducts;
