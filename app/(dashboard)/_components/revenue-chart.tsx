'use client';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart';
import { DayTotalRevenue } from '@/app/_data-access/dashboard/get-dashboard';
import { Bar, BarChart, XAxis } from 'recharts';

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: 'Receita',
  },
};
interface RevenueCartProps {
  data: DayTotalRevenue[];
}
const RevenueChart = ({ data }: RevenueCartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar className="bg-emerald-700" dataKey={'totalRevenue'} radius={5} />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
