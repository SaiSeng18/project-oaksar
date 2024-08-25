import { ShoppingCart } from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from './ui/button';

const CartDrawer = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <div className='relative'>
                    <ShoppingCart />
                    <div className='absolute -right-2 -top-1 flex size-[15px] items-center justify-center rounded-full border-white bg-white text-sm'>
                        5
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className='mb-10'>
                        This is where you will find your products.
                    </SheetTitle>
                </SheetHeader>

                <div className='mb-10 flex flex-col gap-5'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-5'>
                            <div className='h-16 w-16 rounded-lg bg-gray-200'></div>
                            <div>
                                <h3 className='text-lg font-semibold'>Product Name</h3>
                                <p className='text-sm text-gray-500'>Price: $100</p>
                            </div>
                        </div>
                        <div>
                            <button className='text-red-500'>Remove</button>
                        </div>
                    </div>
                </div>
                <Button className='h-[50px] w-full'>Checkout</Button>
            </SheetContent>
        </Sheet>
    );
};
export default CartDrawer;
