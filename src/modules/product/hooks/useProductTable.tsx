import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import useQueryProducts from './useQueryProducts';
import { Product } from '@/types/product';
import columns from '../components/column';

const useProductTable = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useQueryProducts({
    pageSize,
    pageNumber: pageIndex,
    sort: sorting,
    q: (columnFilters.find(filter => filter.id === 'title')?.value ?? '') as string,
    categories: (columnFilters.find(filter => filter.id === 'category')?.value ?? []) as string[],
    brands: (columnFilters.find(filter => filter.id === 'brand')?.value ?? []) as string[],
  });

  const table = useReactTable<Product>({
    data: data?.products ?? [],
    columns,
    pageCount: data?.totalPages ?? 0,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      sorting,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isLoading };
};

export default useProductTable;
