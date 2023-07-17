'use client';

import { flexRender, type Table as TansTable } from '@tanstack/react-table';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Props<T> = {
  table: TansTable<T>;
};

const TableInstance = <T extends Record<string, unknown>>({ table }: Props<T>) => {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups()?.map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map(row => {
          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <TableCell
                    key={cell.id}
                    className={cell.column.id === 'action' ? 'sticky right-0 bg-white' : ''}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableInstance;
