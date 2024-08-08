import { NextResponse } from 'next/server';

import { db } from '@/db';
import { category, CategoryInsert } from '@/db/schema';

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
        const data = await db.insert(category).values({ name, description });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
