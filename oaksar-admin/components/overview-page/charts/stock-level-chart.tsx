'use client';

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { Banknote } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import ChartCard from './chart-card';

const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];
const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))',
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
    },
    firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))',
    },
    edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))',
    },
    other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))',
    },
} satisfies ChartConfig;

const StockLevelChart = () => {
    return (
        <ChartCard title='Stock Level' icon={Banknote}>
            <div className='flex justify-between gap-2 flex-col'>
                <ChartContainer
                    config={chartConfig}
                    className='mx-auto aspect-square max-h-[250px] h-full w-full'>
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey='visitors'
                            nameKey='browser'
                            innerRadius={50}
                            label={({ payload, ...props }) => {
                                return (
                                    <text
                                        cx={props.cx}
                                        cy={props.cy}
                                        x={props.x}
                                        y={props.y}
                                        textAnchor={props.textAnchor}
                                        dominantBaseline={props.dominantBaseline}
                                        fill='hsla(var(--foreground))'>
                                        {payload.visitors}
                                    </text>
                                );
                            }}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
            </div>
        </ChartCard>
    );
};
export default StockLevelChart;
