import { SortingState } from '@tanstack/react-table';

export type RequestParams = {
  pageSize: number;
  pageNumber: number;
  sort: SortingState;
  q: string;
};
