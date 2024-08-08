import OrderChart from './charts/order-chart';
import RevenueChart from './charts/revenue-chart';

const Analytics = () => {
    return (
        <div className='grid w-full grid-cols-3 gap-5'>
            <RevenueChart />
            <OrderChart />
        </div>
    );
};
export default Analytics;
