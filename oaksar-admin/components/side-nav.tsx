'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SideNav = () => {
    return (
        <div className='flex h-full w-full max-w-[350px] flex-col space-y-5 px-10 py-5 2xl:px-5 xl:max-w-[300px]'>
            <Link href='/overview' className='flex items-center gap-2'>
                <Image src='/icons/oaksar-light.svg' alt='Logo' width={70} height={70} />
                <div className='text-xl font-medium'>Oaksar</div>
            </Link>

            <div className=''>
                <div className='text-4xl'>
                    Welcome <br /> back,{' '}
                    <span className='text-5xl font-medium text-dark'>John!</span>
                </div>
                <div className='text-gray-500'>Currently inventory level</div>
            </div>

            <nav>
                <ul className='flex w-full flex-col space-y-2'>
                    <li className='w-full'>
                        <Nav title='Overview' href='/overview' type='single' />
                    </li>
                    <li className='w-full'>
                        <Nav title='Inventory' href='/overview' type='multiple' />
                    </li>
                    <li className='w-full'>
                        <Nav title='Orders' href='/overview' type='multiple' />
                    </li>
                    <li className='w-full'>
                        <Nav title='Sales' href='/overview' type='multiple' />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

const Nav = ({
    title,
    href,
    type = 'single',
}: {
    title: string;
    href: string;
    type?: 'single' | 'multiple';
}) => {
    if (type === 'single') {
        return (
            <Link
                href={href}
                className='flex h-[60px] w-full items-center justify-between rounded-md px-2 text-gray-1 hover:bg-cyan/50'>
                {title}
            </Link>
        );
    }

    return (
        <Collapsible>
            <CollapsibleTrigger className='flex h-[60px] w-full items-center justify-between rounded-md px-2 text-gray-1 hover:bg-cyan/50 [&[data-state=open]>svg]:rotate-180'>
                <div>{title}</div>
                <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent className='w-full pl-10'>
                <Link href={href} className='block w-full px-3 py-3 hover:bg-gray-100/50'>
                    {title}
                </Link>
            </CollapsibleContent>
        </Collapsible>
    );
};
export default SideNav;
