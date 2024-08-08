import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
    try {
        return NextResponse.json({ message: 'Products' });
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        return NextResponse.json({ message: 'Products' });
    } catch (error) {
        console.log('[BILLBOARD_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
