import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import useQueryProducts from './useQueryProducts';
import { Product } from '@/types/product';
import columns from '../components/column';
import useMutateSaveFilterState from './useMutateSaveFilterState';
import useMutateSaveSortState from './useMutateSaveSortState';

const useProductTable = () => {
  const { mutate: saveFilterState } = useMutateSaveFilterState();
  const { mutate: saveSortState } = useMutateSaveSortState();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>(
    JSON.parse(localStorage.getItem('sortState') || '[]'),
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    JSON.parse(localStorage.getItem('filterState') || '[]'),
  );

  useEffect(() => {
    saveFilterState({ filterState: columnFilters });
  }, [columnFilters]);

  useEffect(() => {
    saveSortState({ sortState: sorting });
  }, [sorting]);

  const { data, isLoading } = useQueryProducts({
    pageSize,
    pageNumber: pageIndex,
    sort: sorting,
    q: (columnFilters.find(filter => filter.id === 'title')?.value ?? '') as string,
    categories: (columnFilters.find(filter => filter.id === 'category')?.value ?? []) as string[],
    brands: (columnFilters.find(filter => filter.id === 'brand')?.value ?? []) as string[],
    priceRange: (columnFilters.find(filter => filter.id === 'price')?.value ?? '') as string,
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
    // getSortedRowModel: getSortedRowModel(),
  });

  return { table, isLoading };
};

export default useProductTable;
