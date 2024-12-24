import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header';
import { SummaryCardSkeleton } from './_components/summary-card';
import TotalRevenueCard from './_components/total-revenue-card';
import { Suspense } from 'react';
import TodayRevenueCard from './_components/today-revenue-card';
import TotalSalesCard from './_components/total-sales-card';
import TotalStockCard from './_components/total-stock-card';
import TotalProductsCard from './_components/total-products.card';
import Last14DaysRevenueCard from './_components/last-14-days-revenue-card';
import { Skeleton } from '../_components/ui/skeleton';
import MostSoldProducts, {
  MostSoldProductsSkeleton,
} from './_components/most-sold-products';

export default async function Home() {
  return (
    <div className="m-8 w-full space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
        </HeaderLeft>
      </Header>

      <div className="mb-2 grid grid-cols-2 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TodayRevenueCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalSalesCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalStockCard />
        </Suspense>

        <Suspense fallback={<SummaryCardSkeleton />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense
          fallback={
            <Skeleton className="bg-white p-6">
              <div className="space-y-2">
                <Skeleton className="h-7 w-[180px] rounded-xl" />
                <Skeleton className="h-5 w-[180px] rounded-xl" />
              </div>
            </Skeleton>
          }
        >
          <Last14DaysRevenueCard />
        </Suspense>

        <Suspense fallback={<MostSoldProductsSkeleton />}>
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
}
