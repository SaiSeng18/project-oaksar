'use server';

import { signIn } from 'next-auth/react';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email does not exist!' };
    }
    if (!existingUser.password) {
        return { error: 'No password' };
    }

    try {
        await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard',
        });
    } catch (error) {
        throw error;
    }
};
