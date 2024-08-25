import { NextResponse } from 'next/server';
import { inArray } from 'drizzle-orm';

import { db } from '@/db';
import { supplier, SupplierInsert, SupplierType } from '@/db/schema';

export const revalidate = 0;

export async function GET() {
    try {
        const data = await db.query.supplier.findMany();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[supplier_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, email, phone, description }: SupplierInsert = await req.json();
        console.log(name, description);

        const data = await db
            .insert(supplier)
            .values({ name, email, phone, description })
            .returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[supplier_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { supplierId: string } }) {
    try {
        const body: SupplierType[] = await req.json();
        const ids = body.map(item => item.id);
        const data = await db.delete(supplier).where(inArray(supplier.id, ids)).returning();

        return NextResponse.json(data);
    } catch (error) {
        console.log('[category_DELETE]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
