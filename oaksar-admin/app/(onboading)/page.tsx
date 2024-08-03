import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/header';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between px-10 md:px-5'>
            <Header />
            <section className='flex w-full flex-1 items-center justify-center'>
                <header className='flex flex-col items-center gap-5'>
                    <div className='flex items-center justify-center gap-2 rounded-full border border-purple-500 bg-purple-50 px-5 py-1 text-sm text-purple-500'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1em'
                            height='1em'
                            viewBox='0 0 24 24'>
                            <path
                                fill='currentColor'
                                d='m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26'
                            />
                        </svg>
                        Powered by AI
                    </div>
                    <h1 className='text-[128px] font-bold leading-[1] text-cyan md:text-[48px]'>
                        Oaksar
                    </h1>
                    <p className='max-w-[600px] text-center text-sm text-gray-1'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi non sed
                        recusandae quo quaerat cum voluptates nisi deleniti architecto,
                    </p>
                    <div className='flex items-center gap-5'>
                        <Link
                            href='/overview'
                            className='rounded-md bg-black px-5 py-3 text-sm text-white hover:bg-black/90'>
                            Get Started
                        </Link>

                        <Link
                            href='/about'
                            className='rounded-md border border-black/20 bg-white px-5 py-3 text-sm text-black hover:bg-black/5'>
                            About
                        </Link>
                    </div>
                </header>
            </section>

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
}
