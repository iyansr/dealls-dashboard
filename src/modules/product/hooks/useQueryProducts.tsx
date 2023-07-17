import { getAllProducts } from '@/api/product';
import { RequestParams } from '@/types/request';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useQueryFetchProducts = () => {
  return useQuery(['products'], {
    queryFn: async () => {
      const response = await getAllProducts();
      return response;
    },
    keepPreviousData: true,
  });
};

const useQueryProducts = (params: RequestParams & { categories: string[]; brands: string[] }) => {
  const { data } = useQueryFetchProducts();

  const products = data?.products ?? [];

  const queriedProducts = products.filter(product => {
    const { q } = params;
    if (!q) {
      return true;
    }
    return product.title.toLowerCase().includes(q.toLowerCase());
  });

  const sortedProducts = useMemo(() => {
    return queriedProducts.sort((a, b) => {
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
  }, [params.sort, queriedProducts]);

  const productByCategories = useMemo(() => {
    return sortedProducts.filter(product => {
      const { categories } = params;
      if (!categories.length) {
        return true;
      }
      return categories.includes(product.category);
    });
  }, [params.categories, sortedProducts]);

  const productByBrand = useMemo(() => {
    return productByCategories.filter(product => {
      const { brands } = params;
      if (!brands.length) {
        return true;
      }
      return brands.includes(product.brand);
    });
  }, [params.brands, productByCategories]);

  const startIndex = params.pageNumber * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const totalPages = Math.ceil(productByBrand.length / params.pageSize);

  const finalProducts = productByBrand.slice(startIndex, endIndex);

  return useQuery(['products-filtered', params, data], {
    queryFn: () => {
      return {
        products: finalProducts,
        total: productByBrand.length,
        totalPages,
      };
    },
    keepPreviousData: true,
  });
};

export default useQueryProducts;
