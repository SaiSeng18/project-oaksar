import React from 'react';
import Link from 'next/link';

const CategorySidebar = () => {
    const categories = [
        'electronics',
        'clothing',
        'books',
        'beauty',
        'home',
        'toys',
        'sports',
        'food',
        'furniture',
        'other',
    ];
    return (
        <div className='flex flex-col p-5'>
            <div className='mb-10 text-2xl'>Categories</div>

            <div className='flex flex-col gap-2'>
                <Link href={`/products`} className='capitalize text-zinc-900 hover:text-zinc-500'>
                    All
                </Link>
                {categories.map((category, i) => (
                    <Link
                        key={i}
                        href={`/products?category=${category}`}
                        className='capitalize text-zinc-900 hover:text-zinc-500'>
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategorySidebar;
