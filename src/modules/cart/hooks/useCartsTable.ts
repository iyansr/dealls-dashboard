import { listCartColumn } from '@/modules/cart/components/listCartColumn';
import { PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { useQueryFetchCarts } from './useQueryCarts';
import { Cart } from '@/types/chart';

const useCartsTable = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: carts, isLoading } = useQueryFetchCarts({
    pageNumber: pageIndex,
    pageSize,
  });

  const table = useReactTable<Cart>({
    data: carts?.carts ?? [],
    columns: listCartColumn,
    pageCount: carts?.totalPages ?? 0,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, isLoading };
};

export default useCartsTable;
