import React from 'react';
import Link from 'next/link';

const ProductCard = () => {
    return (
        <Link href='/products/1'>
            <div className='w-full'>
                <div className='mb-5 aspect-square w-full overflow-hidden rounded-md bg-gray-200'></div>
                <div>
                    <div>T-shirt</div>
                    <div className='text-gray-500'>25000 MMK</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
