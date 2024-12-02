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
import { Dialog } from '@/app/_components/ui/dialog';
import DeleteProductDialogContent from './delete-dialog-content';

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
      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Açães</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-1.5"
                  onClick={() => navigator.clipboard.writeText(product.id)}
                >
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-1.5">
                  <EditIcon size={16} />
                  Editar
                </DropdownMenuItem>
                {/*Delete */}

                <AlertDialogTrigger>
                  <DropdownMenuItem className="gap-1.5">
                    <TrashIcon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DeleteProductDialogContent productId={product.id} />
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
