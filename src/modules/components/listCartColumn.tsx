import { Cart } from '@/types/chart';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const listCartColumn: ColumnDef<Cart>[] = [
  {
    accessorKey: 'user.name',
    header: "User's Name",
    cell: props => {
      return (
        <Link href={`/carts/${props.row.original.userId}`} className="underline text-blue-500">
          {props.getValue() as string}
        </Link>
      );
    },
  },
  {
    accessorKey: 'totalProducts',
    header: 'Total Products',
  },
  {
    accessorKey: 'total',
    header: 'Total Price',
    cell: props => `$ ${props.getValue()}`,
  },
  {
    accessorKey: 'discountedTotal',
    header: 'Total Price After Discount',
    cell: props => `$ ${props.getValue()}`,
  },
];
