import { DataTableColumnHeader } from '@/components/data-table/TableColumnHeader';
import { Product } from '@/types/product';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('title')}</div>,
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

export default columns;
