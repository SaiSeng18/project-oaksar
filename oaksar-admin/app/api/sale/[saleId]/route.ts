import { NextResponse } from 'next/server';
import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { order } from '@/db/schema';

export const revalidate = 0;

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
    try {
        const data = await db.query.order.findFirst({
            where: (order, { eq }) => eq(order.id, parseInt(params.orderId)),
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[order_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
    const {
        productId,
        supplierId,
        quantity,
        orderDate,
        expectedDeliveryDate,
        status,
        reorderLevel,
    } = await req.json();
    try {
        const data = await db
            .update(order)
            .set({
                productId: parseInt(productId),
                supplierId: parseInt(supplierId),
                quantity: parseInt(quantity),
                orderDate: new Date(orderDate),
                expectedDeliveryDate: new Date(expectedDeliveryDate),
                status,
                reorderLevel: parseInt(reorderLevel),
            })
            .where(eq(order.id, parseInt(params.orderId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[order_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
    try {
        const ids = params.orderId.split(',').map(Number);
        const data = await db.delete(order).where(inArray(order.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[order_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
