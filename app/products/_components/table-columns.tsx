'use client';
import { Badge } from '@/app/_components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { CircleIcon } from 'lucide-react';
import ProductTableDropdownMenu from './table-dropdown-menu';
import { formatCurrency } from '@/app/_helpers/currency';
import { ProductDTO } from '@/app/_data-access/product/get-products';

const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'Em estoque';
  }
  return 'Esgotado';
};

export const productTableColumns: ColumnDef<ProductDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'price',
    header: 'Valor Unitário',
    cell: (row) => {
      const product = row.row.original;
      return formatCurrency(Number(product.price));
    },
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (row) => {
      const product = row.row.original;
      // @ts-expect-error - status is a string
      const lable = getStatusLabel(product.status);

      return (
        <Badge
          className={`hover:bg-neutral-600 ${
            lable === 'Em estoque'
              ? 'bg-green-200 text-green-900'
              : 'bg-gray-300 text-gray-950'
          }`}
        >
          <CircleIcon size={10} className="mr-2 gap-1" />
          {lable}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: (row) => {
      const product = row.row.original;
      return <ProductTableDropdownMenu product={product} />;
    },
  },
];
