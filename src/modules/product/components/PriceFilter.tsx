import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Column, Table } from '@tanstack/react-table';
import { PlusCircleIcon } from 'lucide-react';
import React from 'react';

type Props<TData> = {
  table: Table<TData>;
};

type FilterProps = {
  min: number;
  max: number;
};

interface TableFilter<TData, TValue> {
  column?: Column<TData, TValue>;
}

export function PriceFilter<TData, TValue>({ column }: TableFilter<TData, TValue>) {
  const defaultValue = (column?.getFilterValue() as string) ?? '';

  const [defaultMin, defaultMax] = defaultValue.split('-');

  const [min, setMin] = React.useState<number>();
  const [max, setMax] = React.useState<number>();

  const onApply = () => {
    column?.setFilterValue(`${min}-${max}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed mb-2 mr-2">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Price
          {defaultMin && defaultMax && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                ${defaultMin} - ${defaultMax}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-4">
          <div className="flex flex-col justify-center  space-y-2">
            <span className="text-sm">Min</span>
            <Input
              type="number"
              className="border border-gray-300 rounded-sm h-8 px-2"
              placeholder="Min"
              value={min}
              defaultValue={defaultValue.split('-')[0]}
              onChange={e => setMin(Number(e.target.value))}
            />
            <span className="text-sm">Max</span>
            <Input
              type="number"
              className="border border-gray-300 rounded-sm h-8 px-2"
              placeholder="Max"
              value={max}
              defaultValue={defaultValue.split('-')[1]}
              onChange={e => setMax(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" className="h-8 border-dashed" onClick={onApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PriceFilter;
