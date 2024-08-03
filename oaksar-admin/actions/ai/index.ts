'use server';

import { openai } from '@ai-sdk/openai';
import { generateObject, generateText, tool } from 'ai';
import { z } from 'zod';

export const getImageData = async () => {
    const { object } = await generateObject({
        model: openai('gpt-4o'),
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

export const getWeatherData = async () => {
    const result = await generateText({
        model: openai('gpt-4o'),
        tools: {
            weather: tool({
                description: 'Get the weather in a location',
                parameters: z.object({
                    location: z.string().describe('The location to get the weather for'),
                }),
                execute: async ({ location }) => ({
                    location,
                    temperature: 72 + Math.floor(Math.random() * 21) - 10,
                }),
            }),
        },
        toolChoice: 'required', // force the model to call a tool
        prompt: 'What is the weather in San Francisco and what attractions should I visit?',
    });

    return result;
};
