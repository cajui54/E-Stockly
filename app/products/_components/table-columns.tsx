'use client';
import { Badge } from '@/app/_components/ui/badge';
import { Product } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';

import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';
import DeleteProductDialogContent from './delete-dialog-content';
import UpsertProductDialogContent from './upsert-dialog-content';
import { useState } from 'react';
import ProductTableDropdownMenu from './table-dropdown-menu';

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
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(product.price));
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
