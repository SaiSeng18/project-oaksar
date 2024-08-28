import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from './schema';

interface ProductProp {
    id: string;
    name: string;
    price: number;
}

const ProductsComponent = ({ products }: { products?: Product[] }) => {
    return (
        <div className='grid grid-cols-3 gap-5'>
            {products?.map(product => (
                <div className='w-full' key={product.id}>
                    <div className='mb-5 aspect-square w-full overflow-hidden rounded-md bg-gray-200'>
                        {/* {product.imgUrl && <Image fill src={product.imgUrl!} alt={product.name!} />} */}
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <div>{product.name}</div>
                            <div className='text-gray-500'>{product.price} MMK</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsComponent;
