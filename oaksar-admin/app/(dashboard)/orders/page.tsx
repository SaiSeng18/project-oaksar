import { Plus } from 'lucide-react';
import Link from 'next/link';

import { OrdersTable } from '@/components/orders-page/data-table';
import { columns } from '@/components/orders-page/data-table/column';
import { ProductType } from '@/db/schema';
import { OrderType } from '@/db/schema/order';

export const dynamic = 'force-dynamic';

async function getData(): Promise<Partial<OrderType & { product: Partial<ProductType> }>[]> {
    return [
        {
            id: 1,
            productId: 101,
            supplierId: 201,
            quantity: 50,
            orderDate: new Date('2024-08-01T10:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-10T10:00:00Z'),
            status: 'received',
            leadTime: 9,
            createdAt: new Date('2024-08-01T10:00:00Z'),
            updatedAt: new Date('2024-08-01T10:00:00Z'),
            product: { id: 1, name: 'Sunglasses' },
        },
        {
            id: 2,
            productId: 102,
            supplierId: 202,
            quantity: 30,
            orderDate: new Date('2024-08-02T11:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-12T11:00:00Z'),
            status: 'shipped',
            leadTime: 10,
            createdAt: new Date('2024-08-02T11:00:00Z'),
            updatedAt: new Date('2024-08-02T11:00:00Z'),
            product: { id: 2, name: 'Watch' },
        },
        {
            id: 3,
            productId: 103,
            supplierId: 203,
            quantity: 20,
            orderDate: new Date('2024-08-03T12:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-13T12:00:00Z'),
            status: 'shipped',
            leadTime: 10,
            createdAt: new Date('2024-08-03T12:00:00Z'),
            updatedAt: new Date('2024-08-03T12:00:00Z'),
            product: { id: 3, name: 'Shoes' },
        },
        {
            id: 4,
            productId: 104,
            supplierId: 204,
            quantity: 40,
            orderDate: new Date('2024-08-04T13:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-14T13:00:00Z'),
            status: 'pending',
            leadTime: 10,
            createdAt: new Date('2024-08-04T13:00:00Z'),
            updatedAt: new Date('2024-08-04T13:00:00Z'),
            product: { id: 4, name: 'Bag' },
        },
        {
            id: 5,
            productId: 105,
            supplierId: 205,
            quantity: 60,
            orderDate: new Date('2024-08-05T14:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-15T14:00:00Z'),
            status: 'received',
            leadTime: 10,
            createdAt: new Date('2024-08-05T14:00:00Z'),
            updatedAt: new Date('2024-08-05T14:00:00Z'),
            product: { id: 5, name: 'Hat' },
        },
        {
            id: 6,
            productId: 106,
            supplierId: 206,
            quantity: 70,
            orderDate: new Date('2024-08-06T15:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-16T15:00:00Z'),
            status: 'shipped',
            leadTime: 10,
            createdAt: new Date('2024-08-06T15:00:00Z'),
            updatedAt: new Date('2024-08-06T15:00:00Z'),
            product: { id: 6, name: 'Jacket' },
        },
        {
            id: 7,
            productId: 107,
            supplierId: 207,
            quantity: 80,
            orderDate: new Date('2024-08-07T16:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-17T16:00:00Z'),
            status: 'shipped',
            leadTime: 10,
            createdAt: new Date('2024-08-07T16:00:00Z'),
            updatedAt: new Date('2024-08-07T16:00:00Z'),
            product: { id: 7, name: 'Gloves' },
        },
        {
            id: 8,
            productId: 108,
            supplierId: 208,
            quantity: 90,
            orderDate: new Date('2024-08-08T17:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-18T17:00:00Z'),
            status: 'pending',
            leadTime: 10,
            createdAt: new Date('2024-08-08T17:00:00Z'),
            updatedAt: new Date('2024-08-08T17:00:00Z'),
            product: { id: 8, name: 'Scarf' },
        },
        {
            id: 9,
            productId: 109,
            supplierId: 209,
            quantity: 100,
            orderDate: new Date('2024-08-09T18:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-19T18:00:00Z'),
            status: 'shipped',
            leadTime: 10,
            createdAt: new Date('2024-08-09T18:00:00Z'),
            updatedAt: new Date('2024-08-09T18:00:00Z'),
            product: { id: 9, name: 'Belt' },
        },
        {
            id: 10,
            productId: 110,
            supplierId: 210,
            quantity: 110,
            orderDate: new Date('2024-08-10T19:00:00Z'),
            expectedDeliveryDate: new Date('2024-08-20T19:00:00Z'),
            status: 'shipped',
            leadTime: 10,
            createdAt: new Date('2024-08-10T19:00:00Z'),
            updatedAt: new Date('2024-08-10T19:00:00Z'),
            product: { id: 10, name: 'Wallet' },
        },
    ];
}

const OrdersPage = async () => {
    const data = await getData();

    return (
        <section className='flex min-h-screen w-full flex-col px-10 py-5 2xl:px-5'>
            <div className='mb-10 flex w-full items-center justify-between'>
                <div className='text-5xl'>Orders</div>

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
                    <OrdersTable columns={columns} data={data} />
                )}
            </div>
        </section>
    );
};
export default OrdersPage;
