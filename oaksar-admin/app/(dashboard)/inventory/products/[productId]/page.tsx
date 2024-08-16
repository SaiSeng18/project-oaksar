import Image from 'next/image';
import Link from 'next/link';
import { Edit, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { db } from '@/db';

const getData = async (id: string) => {
    const data = await db.query.product.findFirst({
        where: (product, { eq }) => eq(product.id, parseInt(id)),
        with: {
            category: true,
        },
    });

    return data;
};

const ProductPage = async ({ params }: { params: { productId: string } }) => {
    const product = await getData(params.productId);

    return (
        <div className='w-full px-10 py-5 2xl:px-5'>
            <div className='mb-10 text-5xl'>{`Product > ${product?.name}`}</div>
            <div className='mb-5 flex items-center gap-2'>
                <Link
                    href='/inventory/products'
                    className='flex w-fit items-center gap-2 rounded-md bg-dark px-4 py-2 text-white hover:bg-dark/90'>
                    Edit <Edit size={20} />
                </Link>
                <Button variant='ai' className='flex items-center gap-2'>
                    Generate
                    <Sparkles size={20} />
                </Button>
            </div>

            <div className='flex w-full gap-5'>
                <div className='w-2/3 space-y-5 rounded-md border p-5'>
                    <div>
                        <div className='font-bold'>Images</div>
                        <div className='flex flex-nowrap gap-5'>
                            {(product?.imgUrls?.length as number) < 1 ? (
                                <div className='black flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-black/50'>
                                    No Images
                                </div>
                            ) : (
                                product?.imgUrls?.map((url, i) => (
                                    <div
                                        key={i}
                                        className='relative size-[150px] overflow-hidden rounded-md object-contain'>
                                        <Image src={url} fill alt='product image' />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='font-bold'>Name</div>
                        <div className=''>{product?.name}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Description</div>
                        <div className=''>{product?.description}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Price</div>
                        <div className=''>{product?.price}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Category</div>
                        <div className=''>{product?.category?.name}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Measurements</div>
                        <div className='flex flex-nowrap items-center gap-5'>
                            {product?.width && (
                                <div className='font-bold'>
                                    Width: <span className='font-normal'>{product?.width}</span>
                                </div>
                            )}
                            {product?.height && (
                                <div className='font-bold'>
                                    Height: <span className='font-normal'>{product?.height}</span>
                                </div>
                            )}
                            {product?.length && (
                                <div className='font-bold'>
                                    Length: <span className='font-normal'>{product?.length}</span>
                                </div>
                            )}
                            {product?.weight && (
                                <div className='font-bold'>
                                    Weight: <span className='font-normal'>{product?.weight}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className='font-bold'>Colors</div>
                        <div className='flex flex-nowrap items-center gap-5'>
                            {product?.colors?.map((color, i) => <div key={i}>{color}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductPage;
