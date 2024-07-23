import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.get('/hello', c => {
    return c.json({
        message: 'Hello Next.js!',
    });
});

app.post('/hello', async c => {
    const body = await c.req.json();

    return c.json({
        message: `Hello ${body.name}!`,
    });
});

export const GET = handle(app);
export const POST = handle(app);
