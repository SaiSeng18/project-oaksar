import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/prisma/db';

export const authOption: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
};
