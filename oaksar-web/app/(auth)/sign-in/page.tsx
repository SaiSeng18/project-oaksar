'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const SignInPage = () => {
    const router = useRouter();

    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className='grid w-full items-center gap-4'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='username'>Username</Label>
                            <Input id='username' placeholder='Username' />
                        </div>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='password'>Password</Label>
                            <Input id='password' type='password' placeholder='Password' />
                        </div>
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
                        <div className='flex justify-between'>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => {
                                    router.push('/');
                                }}>
                                Cancel
                            </Button>
                            <Button type='button' variant='primary'>
                                Sign In
                            </Button>
                        </div>
                    </div>
                </form>
                <Separator className='my-5' />
                <Button
                    variant='primary'
                    className='w-full'
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}>
                    Google
                </Button>
            </CardContent>
        </Card>
    );
};
export default SignInPage;
