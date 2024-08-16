'use client';

import { Banknote } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

import ChartCard from './chart-card';

const chartData = [
    { day: 'Mon', revenue: 186 },
    { day: 'Tue', revenue: 305 },
    { day: 'Wed', revenue: 237 },
    { day: 'Thur', revenue: 73 },
    { day: 'Fri', revenue: 209 },
    { day: 'Sat', revenue: 214 },
    { day: 'Sun', revenue: 312 },
    // { day: "Mon", revenue: 10000},
    // { day: "Tue", revenue: 20000},
    // { day: "Wed", revenue: 30000},
    // { day: "Thur", revenue: 40000},
    // { day: "Fri", revenue: 10000},
    // { day: "Sat", revenue: 10000},
    // { day: "Sun", revenue: 10000},
];
const chartConfig = {
    revenue: {
        label: 'Revenue',
        color: 'rgba(0,255,0,0.5)',
    },
} satisfies ChartConfig;

const RevenueChart = () => {
    return (
        <ChartCard title='Revenue' icon={Banknote} description='Your current balance is 2000%'>
            <div className='flex justify-between gap-2 flex-col'>
                <div className='text-2xl font-medium'>2000$</div>
                <div className='w-full'>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey='day'
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                // tickFormatter={value => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey='revenue'
                                type='linear'
                                stroke='var(--color-revenue)'
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>
            </div>
        </ChartCard>
    );
};
export default RevenueChart;
