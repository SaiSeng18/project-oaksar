import { NextResponse } from 'next/server';
import { differenceInDays } from 'date-fns';
import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { sale, order, OrderType } from '@/db/schema';

export const revalidate = 0;

export async function GET() {
    try {
        const data = await db.query.sale.findMany();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[sale_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const {
            sale,
            saleItems
        } = await req.json();

        const saleData = await db.query.sale.findFirst({
            where: (sale, { eq }) => eq(sale.saleId, parseInt(saleId)),
            with: { sale: { with: { category: true } } },
        });

        if (saleData) {
            await db
                .update(sale)
                .set({
                    quantity: saleData.quantity + parseInt(quantity),
                })
                .where(eq(sale.saleId, parseInt(saleId)))
                .returning();
        } else {
            await db
                .insert(sale)
                .values({
                    saleId,
                    quantity,
                    reorderLevel: parseInt(reorderLevel),
                    leadTime: differenceInDays(new Date(expectedDeliveryDate), new Date(orderDate)),
                })
                .returning();
        }

        const data = await db
            .insert(order)
            .values({
                saleId: parseInt(saleId),
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
        console.log('[sale_POST]', error);
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
