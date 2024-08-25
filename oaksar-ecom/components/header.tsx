import Link from 'next/link';
import { Bell, ShoppingCart } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import CartDrawer from './cart-drawer';

const Header = () => {
    return (
        <div className='container flex justify-between p-5'>
            <Link href='/'>
                <div>Logo</div>
            </Link>

            <div className='flex items-center gap-5'>
                <Link href='/products'>Products</Link>
                <Link href='/About'>About</Link>
                <Link href='/ai-chat'>AI Chat</Link>
            </div>

            <div className='flex items-center gap-5'>
                <div>
                    <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='relative'>
                    <Bell />
                    <div className='absolute -right-1 -top-1 size-[10px] rounded-full border-[2px] border-white bg-red-500'></div>
                </div>

                <CartDrawer />
            </div>
        </div>
    );
};
export default Header;
