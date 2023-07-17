'use client';

import React, { useState } from 'react';
import { LoaderIcon } from 'lucide-react';

import TableInstance from '@/components/data-table/TableInstance';
import { DataTablePagination } from '@/components/data-table/TablePagination';
import { Product } from '@/types/product';
import {
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import useQueryProducts from '../hooks/useQueryProducts';
import columns from '../components/column';

const ProductPage = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { data, isLoading } = useQueryProducts({
    limit: pageSize,
    skip: pageIndex,
    sort: sorting,
    q: '',
  });

  const table = useReactTable<Product>({
    data: data?.products ?? [],
    columns,
    pageCount: Math.ceil((data?.total ?? 0) / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: true,
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
    <div>
      <TableInstance table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default ProductPage;
