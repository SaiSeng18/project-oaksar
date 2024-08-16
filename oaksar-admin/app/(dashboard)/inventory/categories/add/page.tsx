import CategoryForm from '@/components/categories-page/category-form';

export const revalidate = 0;

const AddProductPage = async () => {
    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>Add Category</div>

            <CategoryForm />
        </div>
    );
};
export default AddProductPage;
