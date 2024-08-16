'use client';

import { Package } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

import ChartCard from './chart-card';

const chartData = [
    { status: 'pending', value: 3, fill: 'var(--color-pending)' },
    { status: 'shipped', value: 5, fill: 'var(--color-shipped)' },
    { status: 'received', value: 3, fill: 'var(--color-received)' },
];

const chartConfig = {
    status: {
        label: 'Status',
    },
    value: {
        label: 'Value',
    },
    pending: {
        label: 'Pending',
        color: 'hsl(var(--chart-1))',
    },
    shipped: {
        label: 'Shipped',
        color: 'hsl(var(--chart-2))',
    },
    received: {
        label: 'Received',
        color: 'hsl(var(--chart-3))',
    },
} satisfies ChartConfig;

const OrderChart = () => {
    return (
        <ChartCard title='Orders' icon={Package}>
            <div className='flex justify-between gap-2 w-full'>
                <ChartContainer config={chartConfig} className='w-full h-full'>
                    <BarChart
                        className='w-full'
                        accessibilityLayer
                        data={chartData}
                        layout='vertical'
                        margin={{
                            right: 20,
                        }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey='status'
                            type='category'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={value => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey='value' type='number' hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' />}
                        />
                        <Bar dataKey='value' layout='vertical' radius={4}>
                            <LabelList
                                dataKey='value'
                                position='insideLeft'
                                offset={8}
                                className='fill-[--color-label]'
                                fontSize={12}
                            />
                            <LabelList
                                dataKey='status'
                                position='right'
                                offset={8}
                                className='fill-foreground capitalize'
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
        </ChartCard>
    );
};
export default OrderChart;
