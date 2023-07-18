import { TableFilter } from '@/components/data-table/TableFilter';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import React from 'react';
import useQueryProductCategories from '../hooks/useQueryProductCategories';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import useQueryProductBrand from '../hooks/useQueryProductBrand';
import PriceFilter from './PriceFilter';

type Props<TData> = {
  table: Table<TData>;
};

function TableToolbar<TData>({ table }: Props<TData>) {
  const { data: categories } = useQueryProductCategories();
  const { data: brands } = useQueryProductBrand();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center mb-4 flex-wrap">
      <Input
        placeholder="Search by product name"
        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        onChange={event => table.getColumn('title')?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px] mr-2 mb-2"
      />
      <PriceFilter column={table.getColumn('price')} />
      {table.getColumn('category') && (
        <TableFilter
          column={table.getColumn('category')}
          title="Category"
          options={categories?.map(cat => ({ label: cat, value: cat })) || []}
        />
      )}
      {table.getColumn('brand') && (
        <TableFilter
          column={table.getColumn('brand')}
          title="Brand"
          options={brands?.map(brand => ({ label: brand, value: brand })) || []}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3 mb-2">
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default TableToolbar;
