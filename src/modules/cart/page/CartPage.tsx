'use client';

import TableInstance from '@/components/data-table/TableInstance';
import { TablePagination } from '@/components/data-table/TablePagination';
import React, { Fragment, useState } from 'react';
import { useQueryFetchCarts } from '../hooks/useQueryCarts';
import { LoaderIcon } from 'lucide-react';
import { ColumnDef, PaginationState, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Cart } from '@/types/chart';
import Link from 'next/link';

const CartPage = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: carts, isLoading } = useQueryFetchCarts({
    pageNumber: pageIndex,
    pageSize,
  });

  const columns: ColumnDef<Cart>[] = [
    {
      accessorKey: 'user.name',
      header: "User's Name",
      cell: props => {
        return (
          <Link href={`/carts/${props.row.original.userId}`} className="underline text-blue-500">
            {props.getValue() as string}
          </Link>
        );
      },
    },
    {
      accessorKey: 'totalProducts',
      header: 'Total Products',
    },
    {
      accessorKey: 'total',
      header: 'Total Price',
      cell: props => `$ ${props.getValue()}`,
    },
    {
      accessorKey: 'discountedTotal',
      header: 'Total Price After Discount',
      cell: props => `$ ${props.getValue()}`,
    },
  ];

  const table = useReactTable<Cart>({
    data: carts?.carts ?? [],
    columns,
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
