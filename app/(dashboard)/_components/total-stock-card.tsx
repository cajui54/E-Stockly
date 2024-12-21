import React from 'react';
import {
  SummaryCard,
  SummuryCardIcon,
  SummuryCardSubtitle,
  SummuryCardTitle,
} from './summary-card';
import { PackageIcon } from 'lucide-react';
import { getTotalStock } from '@/app/_data-access/dashboard/get-total-stock';

const TotalStockCard = async () => {
  const totalStock = await getTotalStock();
  return (
    <SummaryCard>
      <SummuryCardIcon>
        <PackageIcon />
      </SummuryCardIcon>
      <SummuryCardTitle>Total em estoque</SummuryCardTitle>
      <SummuryCardSubtitle>{totalStock}</SummuryCardSubtitle>
    </SummaryCard>
  );
};

export default TotalStockCard;
