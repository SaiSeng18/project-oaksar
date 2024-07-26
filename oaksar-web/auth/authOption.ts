import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { getAccountByUserId } from '@/data/account';
import { getUserByEmail, getUserById } from '@/data/user';
import prisma from '@/prisma/db';
import { LoginSchema } from '@/schemas';

export const authOption: AuthOptions = {
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id);

            // Prevent sign in without email verification
            // if (!existingUser?.emailVerified) return false;

            // if (existingUser.isTwoFactorEnabled) {
            //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            //   if (!twoFactorConfirmation) return false;

            //   // Delete two factor confirmation for next sign in
            //   await db.twoFactorConfirmation.delete({
            //     where: { id: twoFactorConfirmation.id }
            //   });
            // }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            // if (token.role && session.user) {
            //     session.user.role = token.role as UserRole;
            // }

            // if (session.user) {
            //     session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            // }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;

            return token;
        },
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                // if (validatedFields.success) {
                const { email, password } = validatedFields.data!;

                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;
                // }

                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 10000,
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
};
