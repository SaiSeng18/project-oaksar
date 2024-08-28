'use server';

import { ReactNode } from 'react';
import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { generateObject, streamText } from 'ai';
import { createAI, createStreamableUI, getMutableAIState, streamUI } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { JokeComponent } from './joke-component';
import ProductsComponent from './products-component';
import { fetchProducts, jokeSchema, productSchema } from './schema';

export interface ServerMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ClientMessage {
    id: string;
    role: 'user' | 'assistant';
    display: ReactNode;
    attachments?: ReactNode;
}

export async function continueConversation(input: string): Promise<ClientMessage> {
    'use server';

    const history = getMutableAIState();
    const uiStream = createStreamableUI();
    const messageStream = createStreamableUI(null);

    const result = await streamUI({
        // model: openai('gpt-3.5-turbo'),
        model: google('gemini-1.5-flash'),
        messages: [...history.get(), { role: 'user', content: input }],
        text: ({ content, done }) => {
            if (done) {
                history.done((messages: ServerMessage[]) => [
                    ...messages,
                    { role: 'assistant', content },
                ]);
            }

            return <div>{content}</div>;
        },
        tools: {
            suggestProducts: {
                description: 'Suggest some products for the user base of their preferences.',
                parameters: z.object({
                    type: z.string().describe('the type of product the user wants'),
                }),
                generate: async function* ({ type }) {
                    yield <div>loading...</div>;

                    const products = await generateObject({
                        model: google('gemini-1.5-flash'),
                        schema: productSchema.array(),
                        prompt:
                            'Suggest some products for the user base on his preferences. For example, prices, colors, sizes, width, or weight. Here are the products that are available:' +
                            fetchProducts +
                            "Note! And I don't want you to show the user the products that are not listed. You do not show all the products. Show only what the user wants",
                    });
                    return <ProductsComponent products={products.object} />;
                },
            },
        },
        // toolChoice: 'required',
        // system: `You are a friendly sales assistant that helps customers deal with their purchases.
        //     here are the available products: ${fetchProducts}.

        //     Note:
        //     1. You do not show the users the products that are not listed.
        // `,
    });
    (async () => {
        try {
            const result2 = await streamText({
                model: google('gemini-1.5-flash'),
                temperature: 0,
                tools: {
                    suggestProducts: {
                        description: 'Suggest some products for the user',
                        parameters: z.object({
                            products: productSchema.array(),
                        }),
                    },
                },
                system: `You are a friendly sales assistant that helps customers deal with their purchases.
            here are the available products: ${fetchProducts}.

            Note:
            1. You do not show the users the products that are not listed.
        `,
            });
            let textContent = '';

            for await (const delta of result2.fullStream) {
                const { type } = delta;

                if (type === 'text-delta') {
                    const { textDelta } = delta;

                    textContent += textDelta;
                    //   messageStream.update(<BotMessage content={textContent} />)

                    history.update({
                        ...history.get(),
                        messages: [
                            ...history.get().messages,
                            {
                                id: nanoid(),
                                role: 'assistant',
                                content: textContent,
                            },
                        ],
                    });
                } else if (type === 'tool-call') {
                    const { toolName, args } = delta;

                    if (toolName === 'suggestProducts') {
                        const { products } = args;
                        uiStream.update(<ProductsComponent products={products} />);

                        history.done({
                            ...history.get(),
                            interactions: [],
                            messages: [
                                ...history.get().messages,
                                {
                                    id: nanoid(),
                                    role: 'assistant',
                                    content: `Here's a list of products you requested. Choose one to proceed. ${fetchProducts}`,
                                    display: {
                                        name: 'productList',
                                        props: {
                                            products,
                                        },
                                    },
                                },
                            ],
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    })();

    return {
        id: nanoid(),
        role: 'assistant',
        display: result.value,
        attachments: uiStream.value,
    };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
    actions: {
        continueConversation,
    },
    initialAIState: [],
    initialUIState: [],
});
