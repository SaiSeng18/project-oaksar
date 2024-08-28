import React from 'react';

import ProductCard from './product-card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ProductList = () => {
    return (
        <div className='w-full'>
            <div className='flex gap-5 p-5'>
                <Input type='text' placeholder='Search products' className='w-[250px]' />
                <Button>Search</Button>
            </div>
            <div className='grid w-full grid-cols-4 gap-5 p-5'>
                <ProductCard />
            </div>
        </div>
    );
};

export default ProductList;
