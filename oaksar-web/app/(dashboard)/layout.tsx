import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import SideNav from '@/components/side-nav';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (!session) redirect('/');

    return (
        <main className='flex h-screen w-full grow-0'>
            <SideNav />
            {children}
        </main>
    );
};
export default DashboardLayout;
