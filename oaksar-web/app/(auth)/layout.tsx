import { redirect } from 'next/navigation';

import { auth } from '@/auth';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (session) return redirect('/dashboard');

    return <div className='flex h-screen w-full items-center justify-center'>{children}</div>;
};
export default AuthLayout;
