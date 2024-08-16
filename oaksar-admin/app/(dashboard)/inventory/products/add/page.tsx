import ProductForm from '@/components/products-page/product-form';
import { db } from '@/db';

export const dynamic = 'force-dynamic';

const AddProductPage = async () => {
    const categories = await db.query.category.findMany();

    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>Add Product</div>

            <ProductForm categories={categories} />
        </div>
    );
};
export default AddProductPage;
