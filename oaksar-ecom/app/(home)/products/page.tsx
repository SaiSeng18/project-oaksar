import CategorySidebar from '@/components/category-sidebar';
import ProductList from '@/components/product-list';

const ProductsPage = ({ searchParams }: { searchParams: { category: string } }) => {
    console.log(searchParams.category);

    return (
        <div className='flex w-full p-5'>
            <CategorySidebar />
            <ProductList />
        </div>
    );
};
export default ProductsPage;
