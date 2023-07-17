import { DataTableFacetedFilter } from '@/components/data-table/TableFilter';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import React from 'react';
import useQueryProductCategories from '../hooks/useQueryProductCategories';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

type Props<TData> = {
  table: Table<TData>;
};

function TableToolbar<TData>({ table }: Props<TData>) {
  const { data: categories } = useQueryProductCategories();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center space-x-2 mb-4">
      <Input
        placeholder="Search by product name"
        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        onChange={event => table.getColumn('title')?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {table.getColumn('category') && (
        <DataTableFacetedFilter
          column={table.getColumn('category')}
          title="Category"
          options={categories?.map(cat => ({ label: cat, value: cat })) || []}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3">
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default TableToolbar;
