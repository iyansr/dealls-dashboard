'use client';

import { LoaderIcon } from 'lucide-react';
import React from 'react';
import { useQueryDetailCart } from '../hooks/useQueryDetailCart';
import { useParams, useRouter } from 'next/navigation';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ProductCart } from '@/types/chart';
import TableInstance from '@/components/data-table/TableInstance';

const CartDetailPage = () => {
  const params = useParams();
  const { data, isLoading } = useQueryDetailCart(params.id as unknown as number);

  const cartColumns: ColumnDef<ProductCart>[] = [
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
      accessorKey: 'quantity',
      header: 'Quantity',
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

  const table = useReactTable<ProductCart>({
    data: data?.products ?? [],
    columns: cartColumns,
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
      <h2 className="font-semibold text-xl">Cart 1</h2>

      <div className="bg-emerald-50 p-4 rounded-lg border border-dashed border-emerald-400 mt-6">
        <h3 className="font-semibold text-emerald-600">Details</h3>

        <div className="mt-6 space-y-2">
          <div className="flex">
            <div className="flex-1">User: {data?.user.name}</div>
            <div className="flex-1">Total Price: $ {data?.total}</div>
          </div>
          <div className="flex">
            <div className="flex-1"># Of items: {data?.totalProducts}</div>
            <div className="flex-1">Total Price After Discount: $ {data?.discountedTotal}</div>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-6 text-lg font-semibold">Products</div>

      <TableInstance table={table} columnLength={cartColumns.length} />
    </div>
  );
};

export default CartDetailPage;
