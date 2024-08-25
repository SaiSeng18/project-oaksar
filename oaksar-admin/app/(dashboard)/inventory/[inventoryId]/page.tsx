import InventoryInfo from '@/components/inventory-page/inventory-info';
import { db } from '@/db';
import { CategoryType, InventoryType, ProductType } from '@/db/schema';

export const revalidate = 0;

const getData = async (
    id: string
): Promise<Partial<InventoryType & { product: ProductType & { category: CategoryType } }>> => {
    const data = (await db.query.inventory.findFirst({
        where: (inventory, { eq }) => eq(inventory.id, parseInt(id)),
        with: { product: { with: { category: true } } },
    })) as Partial<InventoryType & ProductType>;

    return data;
};

const InventoryPage = async ({ params }: { params: { inventoryId: string } }) => {
    const inventory = await getData(params.inventoryId);

    if (!inventory)
        return <div className='flex h-screen flex-1 items-center justify-center'>No Inventory</div>;

    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>{`Product > ${inventory.product?.name}`}</div>
            <InventoryInfo inventory={inventory} />
        </div>
    );
};
export default InventoryPage;
