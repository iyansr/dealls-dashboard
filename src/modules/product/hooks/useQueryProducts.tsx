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

const useQueryProducts = (params: RequestParams & { categories: string[] }) => {
  const { data } = useQueryFetchProducts();

  return useQuery(['products-filtered', params, data], {
    queryFn: async () => {
      const products = data?.products ?? [];
      const total = products.length;

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

        if (id === 'brand') {
          return desc ? b.brand.localeCompare(a.brand) : a.brand.localeCompare(b.brand);
        }

        if (id === 'stock') {
          return desc ? b.stock - a.stock : a.stock - b.stock;
        }

        return 0;
      });

      const productByCategories = sortedProducts.filter(product => {
        const { categories } = params;
        if (!categories.length) {
          return true;
        }
        return categories.includes(product.category);
      });

      const startIndex = params.pageNumber * params.pageSize;
      const endIndex = startIndex + params.pageSize;
      const totalPages = Math.ceil(productByCategories.length / params.pageSize);

      const finalProducts = productByCategories.slice(startIndex, endIndex);

      return {
        products: finalProducts,
        total: productByCategories.length,
        totalPages,
      };
    },
    keepPreviousData: true,
  });
};

export default useQueryProducts;
