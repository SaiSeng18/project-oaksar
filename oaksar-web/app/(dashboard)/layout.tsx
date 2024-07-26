import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { auth } from '@/auth';
import { authOption } from '@/auth/authOption';
import SideNav from '@/components/side-nav';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    console.log(session);

    if (!session) redirect('/sign-in');

    return (
        <div className='relative w-full'>
            <div className='absolute -z-10 size-[700px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan opacity-40 blur-[100px]'></div>
            <div className='absolute right-0 -z-10 size-[1000px] -translate-y-1/3 rounded-full bg-[#d0d6f1] opacity-70 blur-[100px]'></div>
            <main className='mx-auto flex h-screen w-full max-w-[1440px] grow-0'>
                <SideNav />
                <div className='flex-1'>{children}</div>
            </main>
        </div>
    );
};
export default DashboardLayout;
