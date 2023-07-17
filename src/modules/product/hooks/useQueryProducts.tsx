import { getAllProducts } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useQueryProducts = () => {
  return useQuery(['products'], {
    queryFn: async () => {
      const products = await getAllProducts();
      return products;
    },
  });
};

export default useQueryProducts;
