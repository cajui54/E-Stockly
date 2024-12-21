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
import RevenueChart from './_components/revenue-chart';
import MostSoldProduct from './_components/most-sold-product-item';

export default async function Home() {
  const {
    totalRevenue,
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();
  return (
    <div className="m-8 w-full space-y-8 rounded-lg">
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

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <div className="mt-4 flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <RevenueChart data={totalLast14DaysRevenue} />
        </div>
        <div className="mt-4 flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <p className="p-6 text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>

          <div className="mt-6 space-y-7 overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProduct key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
