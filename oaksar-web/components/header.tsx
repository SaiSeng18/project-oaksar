'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

import UserAvatar from './user-avatar';

const Header = () => {
    const { status, data } = useSession();
    const router = useRouter();

    return (
        <div className='flex w-full max-w-[1440px] items-center justify-between py-5'>
            <div className='flex flex-1 justify-start'>
                <Link href='/'>
                    <Image src='/icons/oaksar-light.svg' alt='logo' width={75} height={75} />
                </Link>
            </div>

            <nav className='flex flex-1 justify-center md:hidden'>
                <ul className='flex items-center gap-5'>
                    <li>
                        <Link href='/features' className='text-gray-1/80 hover:text-gray-1'>
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href='/about' className='text-gray-1/80 hover:text-gray-1'>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href='/members' className='text-gray-1/80 hover:text-gray-1'>
                            Members
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className='flex flex-1 justify-end gap-2'>
                <Link
                    href='/dashboard'
                    className='rounded-md bg-dark px-5 py-3 text-sm text-white hover:bg-dark/90'>
                    Get Started
                </Link>
                {status === 'authenticated' ? (
                    <>
                        <UserAvatar user={data.user} />
                    </>
                ) : (
                    <Link
                        href='/sign-in'
                        className='rounded-md border border-black/20 bg-white px-5 py-3 text-sm text-dark hover:bg-dark/5'>
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
};
export default Header;
