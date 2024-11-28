import React from 'react';
import { DataTable } from '../_components/ui/data-table';
import { productTableColumns } from './_components/table-columns';
import { cachedGetProducts } from '../_data-access/product/get-products';
import CreateProductButton from './_components/create-product-button';

const ProductsPage = async () => {
  const products = await cachedGetProducts();
  return (
    <div className="w-full space-y-8 bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">Produtos</span>
          <h2 className="text-2xl font-semibold">Gestão de Produtos</h2>
        </div>
        <CreateProductButton />
      </div>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
