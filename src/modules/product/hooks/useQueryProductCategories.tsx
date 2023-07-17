import { getAllProductCategory } from '@/api/product';
import { useQuery } from '@tanstack/react-query';

const useQueryProductCategories = () => {
  return useQuery(['products-category'], {
    queryFn: async () => {
      const response = await getAllProductCategory();
      return response;
    },
    keepPreviousData: true,
  });
};

export default useQueryProductCategories;
