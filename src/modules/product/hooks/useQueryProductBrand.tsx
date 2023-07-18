import { useQueryFetchProducts } from './useQueryProducts';
import { useQuery } from '@tanstack/react-query';

const useQueryProductBrand = () => {
  const { data } = useQueryFetchProducts('');
  const products = data?.products ?? [];

  const productBrand = [...new Set(products.map(product => product.brand))];
  return useQuery(['productBrand', data], {
    queryFn: () => {
      return productBrand;
    },
  });
};

export default useQueryProductBrand;
