'use client';
import { Button } from '@/app/_components/ui/button';
import { SaleDTO } from '@/app/_data-access/sales/get-sales';
import { formatCurrency } from '@/app/_helpers/currency';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';
import SaleTableDropdownMenu from './table-dropdown-menu';

export const saleTableColumns: ColumnDef<SaleDTO>[] = [
  {
    accessorKey: 'productName',
    header: 'Produtos',
  },
  {
    accessorKey: 'totalProduct',
    header: 'Quantidade de Produtos',
  },
  {
    header: 'Valor Total',
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => <span>{formatCurrency(totalAmount)}</span>,
  },
  {
    header: 'Data',
    cell: ({
      row: {
        original: { date },
      },
    }) => {
      console.log(date);

      return new Date(date).toLocaleDateString('pt-BR');
    },
  },
  {
    header: 'Ações',
    cell: ({ row: { original: sale } }) => (
      <SaleTableDropdownMenu sale={sale} />
    ),
  },
];
