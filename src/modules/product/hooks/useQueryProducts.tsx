import { getAllProducts } from '@/api/product';
import { RequestParams } from '@/types/request';
import { useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

const useQueryFetchProducts = () => {
  return useQuery(['products'], {
    queryFn: async () => {
      const response = await getAllProducts();
      return response;
    },
    keepPreviousData: true,
  });
};

const useQueryProducts = (params: RequestParams & { sort: SortingState }) => {
  const { data } = useQueryFetchProducts();

  return useQuery(['products-filtered', params, data], {
    queryFn: async () => {
      const products = data?.products ?? [];
      const total = products.length;
      const limit = params.limit ?? 0;

      const queriedProducts = products.filter(product => {
        const { q } = params;
        if (!q) {
          return true;
        }
        return product.title.toLowerCase().includes(q.toLowerCase());
      });

      const sortedProducts = queriedProducts.sort((a, b) => {
        const sort = params.sort[0];

        if (!sort) {
          return 0;
        }
        const { id, desc } = sort;
        if (id === 'title') {
          return desc ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
        }

        if (id === 'price') {
          return desc ? b.price - a.price : a.price - b.price;
        }

        if (id === 'stock') {
          return desc ? b.stock - a.stock : a.stock - b.stock;
        }

        return 0;
      });
      const finalProducts = sortedProducts.slice(params.skip ?? 0, params.skip + (limit ?? 0));

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
