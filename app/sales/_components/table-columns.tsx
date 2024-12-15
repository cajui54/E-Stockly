'use client';
import { SaleDTO } from '@/app/_data-access/sales/get-sales';
import { formatCurrency } from '@/app/_helpers/currency';
import { ColumnDef } from '@tanstack/react-table';
import SaleTableDropdownMenu from './table-dropdown-menu';
import { ProductDTO } from '@/app/_data-access/product/get-products';
import { ComboboxOption } from '@/app/_components/ui/combobox';

interface SaleTableColumn extends SaleDTO {
  products: ProductDTO[];
  productOptions: ComboboxOption[];
}
export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
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
      <SaleTableDropdownMenu
        sale={sale}
        products={sale.products}
        productOptions={sale.productOptions}
      />
    ),
  },
];
