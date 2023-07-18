'use client';

import TableInstance from '@/components/data-table/TableInstance';
import { TablePagination } from '@/components/data-table/TablePagination';
import React, { Fragment, useState } from 'react';
import { useQueryFetchCarts } from '../hooks/useQueryCarts';
import { LoaderIcon } from 'lucide-react';
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Cart } from '@/types/chart';

const CartPage = () => {
  const { data: carts, isLoading } = useQueryFetchCarts();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<Cart>[] = [
    {
      accessorKey: 'userId',
      header: 'User Id',
    },
  ];

  const table = useReactTable<Cart>({
    data: carts?.carts ?? [],
    columns,
    pageCount: carts?.total ?? 0,
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

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center">
        <h3 className="text-lg font-semibold">Loading Data</h3>
        <LoaderIcon size={32} className="animate-spin mt-4" />
      </div>
    );
  }

  return (
    <Fragment>
      <TableInstance table={table} columnLength={columns.length} />
      <TablePagination table={table} />
    </Fragment>
  );
};

export default CartPage;
