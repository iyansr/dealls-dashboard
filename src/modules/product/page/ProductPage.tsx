'use client';

import React, { Fragment } from 'react';
import { LoaderIcon } from 'lucide-react';

import TableInstance from '@/components/data-table/TableInstance';
import { TableFilter } from '@/components/data-table/TablePagination';

import columns from '../components/column';
import TableToolbar from '../components/TableToolbar';
import useProductTable from '../hooks/useProductTable';

const ProductPage = () => {
  const { table, isLoading } = useProductTable();

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
      <TableToolbar table={table} />
      <TableInstance table={table} columnLength={columns.length} />
      <TableFilter table={table} />
    </Fragment>
  );
};

export default ProductPage;
