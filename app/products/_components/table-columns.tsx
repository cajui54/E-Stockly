'use client';

import { Badge } from '@/app/_components/ui/badge';
import { Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { CircleIcon } from 'lucide-react';

const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'Em estoque';
  }
  return 'Esgotado';
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'price',
    header: 'Valor Unitário',
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
];
