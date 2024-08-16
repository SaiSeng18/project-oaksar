import { inArray } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { inventory, InventoryType } from '@/db/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await db.query.inventory.findMany();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { productId, quantity, reorderLevel, leadTime } = await req.json();

        const data = await db
            .insert(inventory)
            .values({ productId, quantity, reorderLevel, leadTime })
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        const body: InventoryType[] = await req.json();
        const ids = body.map(item => item.id);
        const data = await db.delete(inventory).where(inArray(inventory.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
