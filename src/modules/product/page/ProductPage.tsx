'use client';

import React, { useState } from 'react';
import { LoaderIcon } from 'lucide-react';

import TableInstance from '@/components/data-table/TableInstance';
import { DataTablePagination } from '@/components/data-table/TablePagination';
import { Product } from '@/types/product';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import useQueryProducts from '../hooks/useQueryProducts';
import columns from '../components/column';
import TableToolbar from '../components/TableToolbar';

const ProductPage = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useQueryProducts({
    pageSize,
    pageNumber: pageIndex,
    sort: sorting,
    q: (columnFilters.find(filter => filter.id === 'title')?.value ?? '') as string,
    categories: (columnFilters.find(filter => filter.id === 'category')?.value ?? []) as string[],
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
      <TableToolbar table={table} />
      <TableInstance table={table} columnLength={columns.length} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default ProductPage;
