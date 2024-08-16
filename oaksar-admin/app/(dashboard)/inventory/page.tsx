import Link from 'next/link';
import { Plus } from 'lucide-react';

import { DataTable } from '@/components/inventory-page/data-table';
import { columns } from '@/components/inventory-page/data-table/column';
import { db } from '@/db';
import { InventoryType, ProductType } from '@/db/schema';

export const revalidate = 0;

async function getData(): Promise<Partial<InventoryType & ProductType>[]> {
    const data = (await db.query.inventory.findMany({ with: { product: true } })) as Partial<
        InventoryType & ProductType
    >[];
    return data;
}

const InventoryPage = async () => {
    const data = await getData();

    return (
        <section className='flex min-h-screen w-full flex-col px-10 py-5 2xl:px-5'>
            <div className='mb-10 flex w-full items-center justify-between'>
                <div className='text-5xl'>Inventories</div>

                <Link
                    href='/inventory/add'
                    className='flex items-center gap-2 rounded-md bg-dark px-4 py-2 text-light hover:bg-dark/90'>
                    Add
                    <Plus size={15} />
                </Link>
            </div>

            <div className='w-full'>
                {data.length < 1 ? (
                    <div className='flex h-40 flex-1 items-center justify-center'>
                        Start By Adding New Data
                    </div>
                ) : (
                    <DataTable columns={columns} data={data} />
                )}
            </div>
        </section>
    );
};
export default InventoryPage;
