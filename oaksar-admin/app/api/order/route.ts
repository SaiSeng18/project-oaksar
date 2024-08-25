import { NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { inventory, order, OrderType } from '@/db/schema';

export const revalidate = 0;

export async function GET() {
    try {
        const data = await db.query.order.findMany();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const {
            productId,
            supplierId,
            quantity,
            orderDate,
            expectedDeliveryDate,
            status,
            reorderLevel,
        } = await req.json();

        const inventoryData = await db.query.inventory.findFirst({
            where: (inventory, { eq }) => eq(inventory.productId, parseInt(productId)),
            with: { product: { with: { category: true } } },
        });

        if (inventoryData) {
            await db
                .update(inventory)
                .set({
                    quantity: inventoryData.quantity + parseInt(quantity),
                })
                .where(eq(inventory.productId, parseInt(productId)))
                .returning();
        } else {
            await db
                .insert(inventory)
                .values({
                    productId,
                    quantity,
                    reorderLevel: parseInt(reorderLevel),
                    leadTime: differenceInDays(new Date(expectedDeliveryDate), new Date(orderDate)),
                })
                .returning();
        }

        const data = await db
            .insert(order)
            .values({
                productId: parseInt(productId),
                supplierId: parseInt(supplierId),
                quantity: parseInt(quantity),
                orderDate: new Date(orderDate),
                expectedDeliveryDate: new Date(expectedDeliveryDate),
                status,
                reorderLevel: parseInt(reorderLevel),
            })
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
    try {
        const body: OrderType[] = await req.json();
        const ids = body.map(item => item.id);
        const data = await db.delete(order).where(inArray(order.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[order_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
