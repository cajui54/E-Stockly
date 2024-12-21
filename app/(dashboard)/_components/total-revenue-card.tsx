import { getTotalRevenue } from '@/app/_data-access/dashboard/get-total-revenue';
import React from 'react';
import {
  SummaryCard,
  SummuryCardIcon,
  SummuryCardSubtitle,
  SummuryCardTitle,
} from './summary-card';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '@/app/_helpers/currency';

const TotalRevenueCard = async () => {
  const totalRevenue = await getTotalRevenue();
  return (
    <SummaryCard>
      <SummuryCardIcon>
        <DollarSign />
      </SummuryCardIcon>
      <SummuryCardTitle>Receita Total</SummuryCardTitle>
      <SummuryCardSubtitle>{formatCurrency(totalRevenue)}</SummuryCardSubtitle>
    </SummaryCard>
  );
};

export default TotalRevenueCard;
