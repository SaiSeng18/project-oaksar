'use server';

import axios from 'axios';

import { db } from '@/db';
import { category } from '@/db/schema';

export const createCategory = async (name: string, description: string) => {
    try {
        // const res = await db.insert(category).values({ name, description });
        const res = await axios.post('/api/category', { name, description });

        return res;
    } catch (error) {
        console.log(error);
    }
};
