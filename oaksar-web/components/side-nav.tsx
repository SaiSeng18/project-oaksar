import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';

import NavItem from './nav-item';
import UserAvatar from './user-avatar';

const SideNav = async () => {
    const session = await auth();

    return (
        <div className='flex w-[300px] flex-col justify-between border-r p-5'>
            <div className='flex w-full flex-col'>
                <Link href='/dashboard' className='mb-10'>
                    <Image src='/icons/oaksar-light.svg' alt='Logo' width={70} height={70} />
                </Link>

                <div className='flex w-full flex-col'>
                    <NavItem />
                </div>
            </div>

            <UserAvatar user={session?.user} />
        </div>
    );
};
export default SideNav;
