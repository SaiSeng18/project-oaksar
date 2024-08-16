import { eq, inArray } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { category } from '@/db/schema';

export const dynamic = 'force-dynamic';

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

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        const ids = params.categoryId.split(',').map(Number);
        const data = await db.delete(category).where(inArray(category.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
