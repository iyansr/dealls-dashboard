import { useMutation } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';

const useMutateSaveSortState = () => {
  return useMutation<unknown, unknown, { sortState: SortingState }>({
    mutationFn: async ({ sortState }) => {
      localStorage.setItem('sortState', JSON.stringify(sortState));
    },
  });
};

export default useMutateSaveSortState;
