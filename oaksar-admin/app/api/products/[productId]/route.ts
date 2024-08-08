import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { product } from '@/db/schema';

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    try {
        const data = await db.query.product.findFirst({
            where: (product, { eq }) => eq(product.id, parseInt(params.productId)),
            with: {
                category: true,
            },
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
) {
    const { name, price, description, categoryId } = await req.json();
    try {
        const data = await db
            .update(product)
            .set({
                name,
                price,
                description,
                categoryId,
            })
            .where(eq(product.id, parseInt(params.productId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; productId: string } }
) {
    try {
        const data = await db
            .delete(product)
            .where(eq(product.id, parseInt(params.productId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
