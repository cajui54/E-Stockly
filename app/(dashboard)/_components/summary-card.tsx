import { ReactNode } from 'react';

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
