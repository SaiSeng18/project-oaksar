'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/actions/login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LoginSchema } from '@/schemas';

const SignUpPage = () => {
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError('');

        try {
            signIn('credentials', {
                email: values.email,
                password: values.password,
                callbackUrl: '/dashboard',
                redirect: false,
            }).then(res => {
                if (res?.ok) {
                    router.push('/dashboard');
                } else {
                    switch (res?.error) {
                        case 'CredentialsSignin':
                            setError('Invalid credentials!');
                        default:
                            setError('Something went wrong!');
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }

        // startTransition(() => {
        //     login(values).then(data => {
        //         setError(data?.error);
        //     });
        // });
    }

    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid w-full items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col space-y-1.5'>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col space-y-1.5'>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Password'
                                                type='password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                Don't have an account?
                                <Button
                                    type='button'
                                    variant='none'
                                    className='ml-3 underline'
                                    onClick={() => {
                                        router.push('/sign-up');
                                    }}>
                                    Sign up
                                </Button>
                            </div>
                            {error ? <p className='text-sm text-red-500'>{error}</p> : null}
                            <Button type='submit' variant='primary'>
                                Sign In
                            </Button>
                        </div>
                    </form>
                </Form>
                <Separator className='my-5' />
                <Button
                    disabled={isPending}
                    variant='outline'
                    className='w-full'
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
                    Google
                </Button>
            </CardContent>
        </Card>
    );
};
export default SignUpPage;
