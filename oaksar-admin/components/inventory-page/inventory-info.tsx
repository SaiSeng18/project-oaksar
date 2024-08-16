'use client';

import { generateInventoryInfo } from '@/actions/ai/generateInventoryInfo';
import { InventoryType, ProductType } from '@/db/schema';
import { readStreamableValue } from 'ai/rsc';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CustomMd from '../custom-md';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Textarea } from '../ui/textarea';

const InventoryInfo = ({
    inventory,
}: {
    inventory: Partial<InventoryType & { product: ProductType }>;
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
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    // console.log(text);

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
