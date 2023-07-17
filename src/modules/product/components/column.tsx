import { TableColumnHeader } from '@/components/data-table/TableColumnHeader';
import { Product } from '@/types/product';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <TableColumnHeader column={column} title="Product Name" />,
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => <TableColumnHeader column={column} title="Brand" />,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <TableColumnHeader column={column} title="Price" />,
    cell: props => `$ ${props.getValue()}`,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <TableColumnHeader column={column} title="Stock" />,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
];

export default columns;
