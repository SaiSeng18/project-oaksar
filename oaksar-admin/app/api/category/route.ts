import { NextResponse } from 'next/server';
import { inArray } from 'drizzle-orm';

import { db } from '@/db';
import { category, CategoryInsert, CategoryType } from '@/db/schema';

export async function GET() {
    try {
        const data = await db.query.category.findMany();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, description }: CategoryInsert = await req.json();
        console.log(name, description);

        const data = await db.insert(category).values({ name, description }).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        const body: CategoryType[] = await req.json();
        const ids = body.map(item => item.id);
        const data = await db.delete(category).where(inArray(category.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
