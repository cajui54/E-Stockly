import {
  CircleDollarSign,
  DollarSign,
  PackageIcon,
  ShoppingBasketIcon,
} from 'lucide-react';
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header';
import {
  SummaryCard,
  SummuryCardIcon,
  SummuryCardSubtitle,
  SummuryCardTitle,
} from './_components/summary-card';
import { getDashboard } from '../_data-access/dashboard/get-dashboard';
import { formatCurrency } from '../_helpers/currency';

export default async function Home() {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } =
    await getDashboard();
  return (
    <div className="space-y8 m-8 w-full rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
        </HeaderLeft>
      </Header>

      <div className="mb-2 grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummuryCardIcon>
            <DollarSign />
          </SummuryCardIcon>
          <SummuryCardTitle>Receita Total</SummuryCardTitle>
          <SummuryCardSubtitle>
            {formatCurrency(totalRevenue)}
          </SummuryCardSubtitle>
        </SummaryCard>

        <SummaryCard>
          <SummuryCardIcon>
            <DollarSign />
          </SummuryCardIcon>
          <SummuryCardTitle>Receita Hoje</SummuryCardTitle>
          <SummuryCardSubtitle>
            {formatCurrency(todayRevenue)}
          </SummuryCardSubtitle>
        </SummaryCard>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummuryCardIcon>
            <CircleDollarSign />
          </SummuryCardIcon>
          <SummuryCardTitle>Vendas totais</SummuryCardTitle>
          <SummuryCardSubtitle>{totalSales}</SummuryCardSubtitle>
        </SummaryCard>

        <SummaryCard>
          <SummuryCardIcon>
            <PackageIcon />
          </SummuryCardIcon>
          <SummuryCardTitle>Total em estoque</SummuryCardTitle>
          <SummuryCardSubtitle>{totalStock}</SummuryCardSubtitle>
        </SummaryCard>

        <SummaryCard>
          <SummuryCardIcon>
            <ShoppingBasketIcon />
          </SummuryCardIcon>
          <SummuryCardTitle>Productos</SummuryCardTitle>
          <SummuryCardSubtitle>{totalProducts}</SummuryCardSubtitle>
        </SummaryCard>
      </div>
    </div>
  );
}
