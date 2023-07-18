import { useMutation } from '@tanstack/react-query';
import { ColumnFiltersState } from '@tanstack/react-table';

const useMutateSaveFilterState = () => {
  return useMutation<unknown, unknown, { filterState: ColumnFiltersState }>({
    mutationFn: async ({ filterState }) => {
      localStorage.setItem('filterState', JSON.stringify(filterState));
    },
  });
};

export default useMutateSaveFilterState;
