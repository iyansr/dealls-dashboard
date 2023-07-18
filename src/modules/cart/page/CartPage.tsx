'use client';

import TableInstance from '@/components/data-table/TableInstance';
import { TablePagination } from '@/components/data-table/TablePagination';
import React, { Fragment } from 'react';
import { LoaderIcon } from 'lucide-react';
import { listCartColumn } from '@/modules/cart/components/listCartColumn';
import useCartsTable from '../hooks/useCartsTable';

const CartPage = () => {
  const { isLoading, table } = useCartsTable();

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
      <TableInstance table={table} columnLength={listCartColumn.length} />
      <TablePagination table={table} />
    </Fragment>
  );
};

export default CartPage;
