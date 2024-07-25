import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';

import NavItem from './nav-item';
import UserAvatar from './user-avatar';

const SideNav = async () => {
    const session = await auth();

    return (
        <div className='flex w-[300px] flex-col justify-between p-5'>
            <div className='flex w-full flex-col'>
                <Link href='/' className='mb-10 w-fit'>
                    <Image src='/icons/oaksar-light.svg' alt='Logo' width={70} height={70} />
                </Link>

                <div className='flex w-full flex-col'>
                    <NavItem />
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <UserAvatar user={session?.user} />
                <div className='flex flex-col'>
                    <div className='font-bold leading-[1] text-dark'>{session?.user?.name}</div>
                    <div className='text-[0.75rem] text-gray-1'>{session?.user?.email}</div>
                </div>
            </div>
        </div>
    );
};
export default SideNav;
