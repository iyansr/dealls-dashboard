import { TableFilter } from '@/components/data-table/TableFilter';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import React, { useEffect } from 'react';
import useQueryProductCategories from '../hooks/useQueryProductCategories';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import useQueryProductBrand from '../hooks/useQueryProductBrand';
import PriceFilter from './PriceFilter';
import { useDebounce } from '@/lib/hooks/useDebounce';

type Props<TData> = {
  table: Table<TData>;
};

function TableToolbar<TData>({ table }: Props<TData>) {
  const { data: categories } = useQueryProductCategories();
  const { data: brands } = useQueryProductBrand();

  const [searchValue, setSearchValue] = React.useState<string>(
    (table.getColumn('title')?.getFilterValue() as string) ?? '',
  );
  const debouncedSearch = useDebounce(searchValue, 500);

  const handleClear = () => {
    table.resetColumnFilters();
    setSearchValue('');
  };

  useEffect(() => {
    table.getColumn('title')?.setFilterValue(debouncedSearch);
  }, [debouncedSearch]);

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center mb-4 flex-wrap">
      <Input
        placeholder="Search by product name"
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
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
        <Button variant="ghost" onClick={handleClear} className="h-8 px-2 lg:px-3 mb-2">
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default TableToolbar;
