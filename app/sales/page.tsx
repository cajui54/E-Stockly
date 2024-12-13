import React from 'react';
import { getProducts } from '../_data-access/product/get-products';
import { ComboboxOption } from '../_components/ui/combobox';
import CreateSalesButton from './_components/create-sales-button';
import { saleTableColumns } from './_components/table-columns';
import { getSales } from '../_data-access/sales/get-sales';
import { DataTable } from '../_components/ui/data-table';

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <div className="w-full space-y-8 bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Produtos</span>
          <h2 className="text-2xl font-semibold">Gestão de Venda</h2>
        </div>
        <CreateSalesButton
          products={products}
          productOptions={productOptions}
        />
      </div>
      <DataTable
        columns={saleTableColumns}
        data={JSON.parse(JSON.stringify(sales))}
      />
    </div>
  );
};

export default SalesPage;
