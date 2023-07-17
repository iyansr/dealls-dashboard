'use client';

import TableInstance from '@/components/data-table/TableInstance';
import { Product } from '@/types/product';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

const ProductPage = ({ products }: { products: Product[] }) => {
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
    data: products,
    columns: schema,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="p-6 mx-auto max-w-screen-2xl ml-72">
      <div className="p-4 bg-white rounded-md">
        <TableInstance table={table} />
      </div>
    </main>
  );
};

export default ProductPage;
