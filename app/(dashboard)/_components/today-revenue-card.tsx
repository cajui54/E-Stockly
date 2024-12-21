import React from 'react';
import {
  SummaryCard,
  SummuryCardIcon,
  SummuryCardSubtitle,
  SummuryCardTitle,
} from './summary-card';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '@/app/_helpers/currency';
import { getTodayRevenue } from '@/app/_data-access/dashboard/get-today-revenue';

const TodayRevenueCard = async () => {
  const todayRevenue = await getTodayRevenue();

  return (
    <SummaryCard>
      <SummuryCardIcon>
        <DollarSign />
      </SummuryCardIcon>
      <SummuryCardTitle>Receita Hoje</SummuryCardTitle>
      <SummuryCardSubtitle>{formatCurrency(todayRevenue)}</SummuryCardSubtitle>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
