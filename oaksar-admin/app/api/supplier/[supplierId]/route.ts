import { NextResponse } from 'next/server';
import { eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { supplier } from '@/db/schema';

export const revalidate = 0;

export async function GET(req: Request, { params }: { params: { supplierId: string } }) {
    try {
        const data = await db.query.supplier.findFirst({
            where: (supplier, { eq }) => eq(supplier.id, parseInt(params.supplierId)),
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[supplier_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string; supplierId: string } }
) {
    const { name, email, phone, description } = await req.json();
    try {
        const data = await db
            .update(supplier)
            .set({
                name,
                email,
                phone,
                description,
            })
            .where(eq(supplier.id, parseInt(params.supplierId)))
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[supplier_PATCH]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { supplierId: string } }) {
    try {
        const ids = params.supplierId.split(',').map(Number);
        const data = await db.delete(supplier).where(inArray(supplier.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[supplier_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
