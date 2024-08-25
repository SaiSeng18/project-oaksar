'use server';

import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';

export const generateInventoryInfo = async ({
    inventory,
    message,
}: {
    inventory: string;
    message: string;
}) => {
    const stream = createStreamableValue('');

    (async () => {
        const { textStream } = await streamText({
            // model: openai('gpt-4o'),
            model: google('models/gemini-1.5-pro-latest'),
            messages: [
                {
                    role: 'assistant',
                    content: [
                        {
                            type: 'text',
                            text: 'I want you to act as a inventory assistant. Below here you will find the message the user will provide you with. The price are in MMK currency.',
                        },
                    ],
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: message,
                        },
                        { type: 'text', text: inventory },
                    ],
                },
            ],
            //     prompt: `I want you to generate a markdown for the inventory. Below here you will find all the information. You are going to list the product name, description, quantity, price, category and other available information in this format.

            // # Inventory

            // ## Product Details

            // - **Product Name:** Sunglasses
            // - **Description:** Something to wear for your eyes.
            // - **Quantity:** 10
            // - **Price:** $2000.00
            // - **Category:** 11
            // - **Dimensions:**
            // - **Width:** 6 in
            // - **Height:** 1.5 in
            // - **Length:** 5 in
            // - **Weight:** 2 lb
            // - **Colors Available:** Black

            // ## Inventory Information

            // - **Reorder Level:** 10
            // - **Lead Time:** 30 days
            // - **Created At:** 2024-08-13
            // - **Updated At:** 2024-08-13

            // inventory: ${inventory}

            // Note! You do not list the instruction above in the markdown. You will only reply with the markdown text.
            // `,
        });
        for await (const delta of textStream) {
            stream.update(delta);
        }

        stream.done();
    })();

    return { output: stream.value };
};
