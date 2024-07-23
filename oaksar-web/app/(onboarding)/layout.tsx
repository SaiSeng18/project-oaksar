import Header from '@/components/header';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between px-10 md:px-5'>
            <Header />
            {children}

            <div className='flex w-full max-w-[1440px] flex-wrap items-center justify-between pb-5 pt-20 text-sm md:justify-center md:text-center'>
                <div>
                    Build by the <span className='font-bold'>S.Y.M.K Team</span> with passion. All
                    rights reserved.
                </div>

                <div>
                    Special thanks to{' '}
                    <a href='https://www.samsung.com/mm/' target='_blank' className='font-bold'>
                        Samsung
                    </a>
                </div>
            </div>
        </main>
    );
};
export default Layout;
