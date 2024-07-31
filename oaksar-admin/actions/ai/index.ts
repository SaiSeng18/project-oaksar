'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const getImageData = async () => {
    const { object } = await generateObject({
        model: openai('gpt-4-turbo'),
        maxTokens: 512,
        schema: z.object({
            answers: z.array(
                z.object({
                    name: z.string(),
                    imageUrl: z.string(),
                })
            ),
        }),
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'What do you see in the pictures? If you know the name, do tell. Return along with its image URL.',
                    },
                    {
                        type: 'image',
                        image: new URL(
                            'https://i.pinimg.com/736x/cd/47/9e/cd479e8dbd856aa6585bc5dbc07adf4c.jpg'
                        ),
                    },

                    {
                        type: 'image',
                        image: new URL(
                            'https://i.pinimg.com/564x/61/90/7a/61907a02f549bef67d7ba92e3404cce6.jpg'
                        ),
                    },
                    {
                        type: 'image',
                        image: new URL(
                            'https://i.pinimg.com/564x/69/69/7f/69697fe98099bf566f8b8777efb867e9.jpg'
                        ),
                    },
                ],
            },
        ],
    });
};
