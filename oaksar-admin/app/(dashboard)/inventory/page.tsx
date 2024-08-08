import { Plus } from 'lucide-react';

import { DataTable } from '@/components/inventory/data-table';
import { columns } from '@/components/inventory/data-table/column';
import { Button } from '@/components/ui/button';
import { InventoryType, ProductType } from '@/db/schema';

async function getData(): Promise<Partial<InventoryType & ProductType>[]> {
    // Fetch data from your API here.
    return [
        {
            inventoryId: 1,
            name: 'Product 1',
            quantityOnHand: 10,
            reorderPoint: 5,
            safetyStock: 2,
            createdAt: new Date(),
        },
        {
            inventoryId: 2,
            name: 'Product 2',
            quantityOnHand: 10,
            reorderPoint: 5,
            safetyStock: 2,
            createdAt: new Date(),
        },
        // ...
    ];
}

const InventoryPage = async () => {
    const data = await getData();

    return (
        <section className='flex min-h-screen w-full flex-col px-10 py-5 2xl:px-5'>
            <div className='mb-10 flex w-full items-center justify-between'>
                <div className='text-5xl'>Inventory</div>

                <Button variant='primary' className='flex gap-2'>
                    Add
                    <Plus size={15} />
                </Button>
            </div>

            <div className='w-full'>
                <DataTable columns={columns} data={data} />
            </div>
        </section>
    );
};
export default InventoryPage;
