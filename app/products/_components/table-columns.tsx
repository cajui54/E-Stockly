'use client';

import { ColumnDef } from '@tanstack/react-table';
import ProductTableDropdownMenu from './table-dropdown-menu';
import { formatCurrency } from '@/app/_helpers/currency';
import { ProductDTO } from '@/app/_data-access/product/get-products';
import ProductStatusBadge from '@/app/_components/product-status-badge';

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
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge status={product.status} />;
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
