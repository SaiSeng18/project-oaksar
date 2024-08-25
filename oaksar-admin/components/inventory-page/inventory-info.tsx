'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { readStreamableValue } from 'ai/rsc';
import { Edit } from 'lucide-react';

import { generateInventoryInfo } from '@/actions/ai/generateInventoryInfo';
import { CategoryType, InventoryType, ProductType } from '@/db/schema';

import CustomMd from '../custom-md';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';

const InventoryInfo = ({
    inventory,
}: {
    inventory: Partial<InventoryType & { product: ProductType & { category: CategoryType } }>;
}) => {
    const [input, setInput] = useState('');

    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setText('');
        setLoading(true);
        if (input !== '') {
            try {
                const { output } = await generateInventoryInfo({
                    inventory: JSON.stringify(inventory),
                    message: input,
                });
                for await (const delta of readStreamableValue(output)) {
                    setText(currentGeneration => `${currentGeneration}${delta}`);
                }
                setLoading(false);
                setInput('');
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className='mb-5 flex items-center gap-2'>
                <Link
                    href='/inventory/products'
                    className='flex w-fit items-center gap-2 rounded-md bg-dark px-4 py-2 text-white hover:bg-dark/90'>
                    Edit <Edit size={20} />
                </Link>
                {/* <Button variant='ai' className='flex items-center gap-2' >
                    Generate
                    <Sparkles size={20} />
                </Button> */}
            </div>

            <div className='flex w-full gap-5'>
                <div className='h-fit w-2/3 space-y-5 rounded-md border p-5'>
                    <div>
                        <div className='font-bold'>Name</div>
                        <div className=''>{inventory?.product?.name}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Description</div>
                        <div className=''>{inventory?.quantity}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Price</div>
                        <div className=''>{inventory?.reorderLevel}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Category</div>
                        <div className=''>{inventory?.leadTime}</div>
                    </div>
                    <div className='text-3xl font-bold'>Product</div>
                    <div>
                        <div className='font-bold'>Images</div>
                        <div className='flex flex-nowrap gap-5'>
                            {(inventory.product?.imgUrls?.length as number) < 1 ? (
                                <div className='black flex h-[150px] w-full items-center justify-center rounded-md border border-dashed border-black/50'>
                                    No Images
                                </div>
                            ) : (
                                inventory.product?.imgUrls?.map((url, i) => (
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
                        <div className=''>{inventory.product?.name}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Description</div>
                        <div className=''>{inventory.product?.description}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Price</div>
                        <div className=''>{inventory.product?.price}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Category</div>
                        <div className=''>{inventory.product?.category.name}</div>
                    </div>
                    <div>
                        <div className='font-bold'>Measurements</div>
                        <div className='flex flex-nowrap items-center gap-5'>
                            {inventory.product?.width && (
                                <div className='font-bold'>
                                    Width:{' '}
                                    <span className='font-normal'>{inventory.product?.width}</span>
                                </div>
                            )}
                            {inventory.product?.height && (
                                <div className='font-bold'>
                                    Height:{' '}
                                    <span className='font-normal'>{inventory.product?.height}</span>
                                </div>
                            )}
                            {inventory.product?.length && (
                                <div className='font-bold'>
                                    Length:{' '}
                                    <span className='font-normal'>{inventory.product?.length}</span>
                                </div>
                            )}
                            {inventory.product?.weight && (
                                <div className='font-bold'>
                                    Weight:{' '}
                                    <span className='font-normal'>{inventory.product?.weight}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex w-1/3 flex-col gap-5'>
                    {loading ? (
                        <Skeleton className='h-40 w-full rounded-md border' />
                    ) : text ? (
                        <div className='flex w-full flex-col gap-5'>
                            <div className='w-full rounded-md border p-5'>
                                <CustomMd text={text} />
                            </div>
                        </div>
                    ) : (
                        <div className='flex h-40 w-full items-center justify-center rounded-md border'>
                            Start asking questions about the inventory.
                        </div>
                    )}
                    <div className='flex w-full gap-5'>
                        <Textarea
                            onChange={e => setInput(e.target.value)}
                            className='border-dark'
                        />
                        <Button onClick={handleGenerate}>Submit</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default InventoryInfo;
