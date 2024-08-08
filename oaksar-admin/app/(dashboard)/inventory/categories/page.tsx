import Link from 'next/link';
import { Plus } from 'lucide-react';

import {
    CategoryColumns,
    CategoryTableProps,
} from '@/components/categories-page/data-table/column';
import { DataTable } from '@/components/products-page/data-table';
import { Button } from '@/components/ui/button';

async function getData(): Promise<Partial<CategoryTableProps>[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            name: 'Product 1',

            description: 'Product 1 description',
        },
        {
            id: 2,
            name: 'Product 2',

            description: 'Product 2 description',
        },
        // ...
    ];
}
const CategoriesPage = async () => {
    const data = await getData();

    return (
        <section className='flex min-h-screen w-full flex-col px-10 py-5 2xl:px-5'>
            <div className='mb-10 flex w-full items-center justify-between'>
                <div className='text-5xl'>Categories</div>

                <Link
                    href='/inventory/categories/add'
                    className='flex items-center gap-2 rounded-md bg-dark px-4 py-2 text-light hover:bg-dark/90'>
                    Add
                    <Plus size={15} />
                </Link>
            </div>

            <div className='w-full'>
                <DataTable columns={CategoryColumns} data={data} />
            </div>
        </section>
    );
};
export default CategoriesPage;
