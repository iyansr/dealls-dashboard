import { ProductCart } from '@/types/chart';
import { ColumnDef } from '@tanstack/react-table';

export const cartColumns: ColumnDef<ProductCart>[] = [
  {
    accessorKey: 'title',
    header: 'Product Name',
    cell: ({ row }) => <div className="w-[200px]">{row.getValue('title')}</div>,
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
