import { NextResponse } from 'next/server';

import { db } from '@/db';
import { product } from '@/db/schema';

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
    try {
        const data = await db.query.product.findMany({ with: { category: true } });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const {
            name,
            price,
            description,
            categoryId,
            width,
            height,
            length,
            weight,
            colors,
            imgUrls,
        } = await req.json();

        const data = await db.insert(product).values({
            name,
            price,
            description,
            categoryId: parseInt(categoryId as string),
            width,
            height,
            length,
            weight,
            colors,
            imgUrls,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.log('[product_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
