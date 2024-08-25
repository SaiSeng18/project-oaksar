import CategoryForm from '@/components/categories-page/category-form';
import SuppliersForm from '@/components/suppliers-page/category-form';

const AddProductPage = async () => {
    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>Add Supplier</div>

            <SuppliersForm />
        </div>
    );
};
export default AddProductPage;
