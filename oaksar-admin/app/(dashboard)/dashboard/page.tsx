import { openai } from '@ai-sdk/openai';
import { generateObject, generateText, streamText } from 'ai';
import { z } from 'zod';

import { db } from '@/db';
import { Product, product } from '@/db/schema';

const DashboardPage = async () => {
    // const { text } = await generateText({
    //     model: openai('gpt-4o'),
    //     prompt: `
    // 		what do you see in this link.
    // 		https://i.pinimg.com/736x/cd/47/9e/cd479e8dbd856aa6585bc5dbc07adf4c.jpg
    // 	`,
    // });
    const data: Product[] = await db.select().from(product);
    console.log(data);

    return <div>Hi</div>;
};
export default DashboardPage;
