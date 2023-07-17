'use client';

import TableInstance from '@/components/data-table/TableInstance';
import { DataTablePagination } from '@/components/data-table/TablePagination';
import { Product } from '@/types/product';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import useQueryProducts from '../hooks/useQueryProducts';
import { LoaderIcon } from 'lucide-react';

const ProductPage = () => {
  const { data, isLoading } = useQueryProducts();

  const schema: ColumnDef<Product>[] = [
    {
      accessorKey: 'title',
      header: 'Product Name',
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: props => `$ ${props.getValue()}`,
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
  ];

  const table = useReactTable<Product>({
    data: data?.products ?? [],
    columns: schema,
    getCoreRowModel: getCoreRowModel(),
  });

  // table.setState;

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
