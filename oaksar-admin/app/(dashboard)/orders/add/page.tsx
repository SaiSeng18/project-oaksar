import InventoryForm from '@/components/inventory-page/inventory-form';
import OrderForm from '@/components/orders-page/order-form';
import { db } from '@/db';

export const revalidate = 0;

const AddProductPage = async () => {
    const products = await db.query.product.findMany();
    const suppliers = await db.query.supplier.findMany();

    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>Add Orders</div>

            <OrderForm products={products} suppliers={suppliers} />
        </div>
    );
};
export default AddProductPage;
