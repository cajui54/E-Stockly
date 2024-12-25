import { ReactNode } from 'react';
import React from 'react';
import { Skeleton } from '@/app/_components/ui/skeleton';
interface SummaryCardProps {
  children: ReactNode;
}
export const SummuryCardIcon = ({ children }: SummaryCardProps) => {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-opacity-10 text-emerald-500">
      {children}
    </div>
  );
};
export const SummuryCardTitle = ({ children }: SummaryCardProps) => {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
};
export const SummuryCardSubtitle = ({ children }: SummaryCardProps) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};
export const SummaryCard = ({ children }: SummaryCardProps) => {
  return <div className="mt-4 rounded-xl bg-white p-6">{children}</div>;
};

export const SummaryCardSkeleton = () => {
  return (
    <div className="space-x-4 space-y-5 bg-white p-6">
      <Skeleton className="ml-5 h-9 w-9 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px] rounded-full" />
        <Skeleton className="h-8 w-[250px] rounded-full" />
      </div>
    </div>
  );
};
