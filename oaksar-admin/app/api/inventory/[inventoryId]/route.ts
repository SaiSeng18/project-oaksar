import { NextResponse } from 'next/server';
import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { inventory } from '@/db/schema';

export const revalidate = 0;

export async function GET(req: Request, { params }: { params: { inventoryId: string } }) {
    try {
        const data = await db.query.inventory.findFirst({
            where: (inventory, { eq }) => eq(inventory.id, parseInt(params.inventoryId)),
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; inventoryId: string } }
) {
    const { productId, quantity, reorderLevel, leadTime } = await req.json();
    try {
        const data = await db
            .update(inventory)
            .set({
                productId,
                quantity: parseInt(quantity),
                reorderLevel: parseInt(reorderLevel),
                leadTime: parseInt(leadTime),
            })
            .where(eq(inventory.id, parseInt(params.inventoryId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[INVENTORY_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { inventoryId: string } }) {
    try {
        const ids = params.inventoryId.split(',').map(Number);
        const data = await db.delete(inventory).where(inArray(inventory.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
