import InventoryForm from '@/components/inventory-page/inventory-form';
import { db } from '@/db';

const AddProductPage = async () => {
    const products = await db.query.product.findMany();

    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>Add Inventory</div>

            <InventoryForm products={products} />
        </div>
    );
};
export default AddProductPage;
