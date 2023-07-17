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
import { Input } from '@/components/ui/input';

const ProductPage = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useQueryProducts({
    limit: pageSize,
    skip: pageIndex,
    sort: sorting,
    q: (columnFilters.find(filter => filter.id === 'title')?.value ?? '') as string,
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
      <div className="flex items-center justify-end mb-4">
        <Input
          placeholder="Search by product name"
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>

      <TableInstance table={table} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default ProductPage;
