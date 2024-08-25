import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import { Button } from './ui/button';

const Footer = () => {
    return (
        <div className='container flex justify-between p-5'>
            <div>Logo</div>
            <div className='flex flex-col gap-2 text-sm'>
                <Link href='/'>Home</Link>
                <Link href='/products'>Products</Link>
                <Link href='/about'>About</Link>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-3'>
                    <div className='text-lg'>Follow Us</div>
                    <div className='flex items-center gap-5'>
                        <div className='flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-black'>
                            <Facebook className='text-white' />
                        </div>
                        <div className='flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-black'>
                            <Instagram className='text-white' />
                        </div>
                        <div className='flex size-[50px] cursor-pointer items-center justify-center rounded-full bg-black'>
                            <Twitter className='text-white' />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='text-lg'>Subscribe</div>
                    <div className='flex items-center gap-2'>
                        <input
                            type='text'
                            className='h-[50px] w-[250px] rounded-full border border-black px-5'
                        />
                        <Button className='h-[50px] rounded-full'>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;
