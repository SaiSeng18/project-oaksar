import OrderChart from './charts/order-chart';
import RevenueChart from './charts/revenue-chart';
import SalesChart from './charts/sales-chart';
import StockLevelChart from './charts/stock-level-chart';

const Analytics = async () => {
    return (
        <div className='flex w-full flex-col gap-5'>
            <div className='grid w-full grid-cols-3 gap-5'>
                <RevenueChart />
                <OrderChart />
                <StockLevelChart />
            </div>

            <div className='w-full'>
                <SalesChart />
            </div>
        </div>
    );
};
export default Analytics;
