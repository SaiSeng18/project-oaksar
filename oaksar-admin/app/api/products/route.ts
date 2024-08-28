import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { category, product } from '@/db/schema';

export const revalidate = 0;

export async function GET(req: NextRequest) {
    const url = new URL(req.url);

    const category = url.searchParams.get('category') as string;
    console.log(category);

    try {
        let data;
        // data = [];
        // data = await db.query.product.findMany({
        //     with: { category: true },
        //     where: (product, { eq }) => eq(product.categoryId, parseInt(category as string)),
        // });

        if (category && category.length < 1) {
            data = await db.$with('category').as(
                db
                    .select()
                    .from(product)
                    .where(eq(product.categoryId, parseInt(category)))
            );
        } else {
            data = await db.select().from(product);
        }

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
