import { RevenueChart } from '../charts/revenue-chart';
import { SalesChart } from '../charts/sales-chart';

const Statistic = () => {
    return (
        <div className='flex w-full flex-col gap-5'>
            <div className='grid w-full grid-cols-3'>
                <RevenueChart />
                {/* <ProfitChart />
		<ExpenseChart /> */}
            </div>
            <div className='w-full'>
                <SalesChart />
            </div>
        </div>
    );
};
export default Statistic;
