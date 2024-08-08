import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { category } from '@/db/schema';

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        const data = await db.query.category.findFirst({
            where: (category, { eq }) => eq(category.id, parseInt(params.categoryId)),
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; categoryId: string } }
) {
    const { name, description } = await req.json();
    try {
        const data = await db
            .update(category)
            .set({
                name,
                description,
            })
            .where(eq(category.id, parseInt(params.categoryId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string; categoryId: string } }
) {
    try {
        const data = await db
            .delete(category)
            .where(eq(category.id, parseInt(params.categoryId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
