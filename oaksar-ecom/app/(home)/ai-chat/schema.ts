import { DeepPartial } from 'ai';
import { z } from 'zod';

export const jokeSchema = z.object({
    setup: z.string().describe('the setup of the joke'),
    punchline: z.string().describe('the punchline of the joke'),
});

export type Joke = DeepPartial<typeof jokeSchema>;

export const productSchema = z.object({
    id: z.string().describe('the id of the product'),
    name: z.string().describe('the name of the product'),
    price: z.number().describe('the price of the product'),
    description: z.string().describe('the description of the product'),
    imgUrl: z.string().optional().describe('the image url of the product'),
});

export type Product = DeepPartial<typeof productSchema>;

export const fetchProducts = JSON.stringify([
    {
        id: '1',
        name: 'Classic White Tee',
        price: 20000,
        description: 'A timeless white T-shirt that pairs with anything.',
        imgUrl: '',
    },
    {
        id: '2',
        name: 'Vintage Graphic Tee',
        price: 22000,
        description: 'A retro-inspired T-shirt with a cool graphic design.',
        imgUrl: '',
    },
    {
        id: '3',
        name: 'Eco-Friendly Tee',
        price: 24000,
        description: 'Made from organic cotton, soft and sustainable.',
        imgUrl: '',
    },
    {
        id: '4',
        name: 'Sporty Fit Tee',
        price: 23000,
        description: 'Perfect for workouts, with moisture-wicking fabric.',
        imgUrl: '',
    },
    {
        id: '5',
        name: 'Bold Stripe Tee',
        price: 21000,
        description: 'A bold striped T-shirt for a stylish look.',
        imgUrl: '',
    },
    {
        id: '6',
        name: 'Minimalist Black Tee',
        price: 25000,
        description: 'A sleek black T-shirt with a minimalist design.',
        imgUrl: '',
    },
    {
        id: '7',
        name: 'Summer Vibes Tee',
        price: 26000,
        description: 'Bright and colorful, great for summer outings.',
        imgUrl: '',
    },
    {
        id: '8',
        name: 'Pocket Tee',
        price: 24000,
        description: 'A casual T-shirt featuring a handy chest pocket.',
        imgUrl: '',
    },
    {
        id: '9',
        name: 'Tie-Dye Tee',
        price: 27000,
        description: 'A vibrant tie-dye T-shirt for a fun, laid-back style.',
        imgUrl: '',
    },
    {
        id: '10',
        name: 'Raglan Sleeve Tee',
        price: 23000,
        description: 'A sporty raglan sleeve T-shirt with contrast colors.',
        imgUrl: '',
    },
]);
