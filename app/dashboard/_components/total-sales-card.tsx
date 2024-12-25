import { getTotalSales } from '@/app/_data-access/dashboard/get-total-sales';
import React from 'react';
import {
  SummaryCard,
  SummuryCardIcon,
  SummuryCardSubtitle,
  SummuryCardTitle,
} from './summary-card';
import { CircleDollarSign } from 'lucide-react';

const TotalSalesCard = async () => {
  const totalSales = await getTotalSales();
  return (
    <SummaryCard>
      <SummuryCardIcon>
        <CircleDollarSign />
      </SummuryCardIcon>
      <SummuryCardTitle>Vendas totais</SummuryCardTitle>
      <SummuryCardSubtitle>{totalSales}</SummuryCardSubtitle>
    </SummaryCard>
  );
};

export default TotalSalesCard;
