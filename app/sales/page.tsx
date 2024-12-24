import React from 'react';
import { getProducts } from '../_data-access/product/get-products';
import { ComboboxOption } from '../_components/ui/combobox';
import CreateSalesButton from './_components/create-sales-button';
import { saleTableColumns } from './_components/table-columns';
import { getSales } from '../_data-access/sales/get-sales';
import { DataTable } from '../_components/ui/data-table';
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header';

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));
  return (
    <div className="w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Vendas</HeaderSubtitle>
          <HeaderTitle>Gestão de Venda</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateSalesButton
            products={products}
            productOptions={productOptions}
          />
        </HeaderRight>
      </Header>

      <DataTable columns={saleTableColumns} data={tableData} />
    </div>
  );
};

export default SalesPage;
