import React from 'react';
import {
  SummaryCard,
  SummuryCardIcon,
  SummuryCardSubtitle,
  SummuryCardTitle,
} from './summary-card';
import { ShoppingBasketIcon } from 'lucide-react';
import { GetTotalProducts } from '@/app/_data-access/dashboard/get-total-products';

const TotalProductsCard = async () => {
  const totalProducts = await GetTotalProducts();
  return (
    <SummaryCard>
      <SummuryCardIcon>
        <ShoppingBasketIcon />
      </SummuryCardIcon>
      <SummuryCardTitle>Productos</SummuryCardTitle>
      <SummuryCardSubtitle>{totalProducts}</SummuryCardSubtitle>
    </SummaryCard>
  );
};

export default TotalProductsCard;
