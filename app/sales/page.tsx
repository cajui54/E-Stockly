import React from 'react';
import { Button } from '../_components/ui/button';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import UpsertSheetContent from './_components/upsert-sheet-content';
import { getProducts } from '../_data-access/product/get-products';
import { ComboboxOption } from '../_components/ui/combobox';

const SalesPage = async () => {
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

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-green-600">Nova Venda</Button>
          </SheetTrigger>
          <UpsertSheetContent
            products={products}
            productOptions={productOptions}
          />
        </Sheet>
      </div>
      {/*<DataTable
    columns={productTableColumns}
    data={JSON.parse(JSON.stringify(products))}
  />*/}
    </div>
  );
};

export default SalesPage;
