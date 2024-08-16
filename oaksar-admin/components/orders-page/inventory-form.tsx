'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { product, ProductType } from '@/db/schema';

const formSchema = z.object({
    productId: z.string().min(1),
    quantity: z.string(),
    reorderLevel: z.string(),
    leadTime: z.string(),
});

const InventoryForm = ({ products }: { products: ProductType[] }) => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: '',
            quantity: '',
            reorderLevel: '',
            leadTime: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const res = await axios.post('/api/inventory', { ...values });
            setLoading(false);

            router.push('/inventory');
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid max-w-3xl grid-cols-2 gap-5'>
                <FormField
                    control={form.control}
                    name='productId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='capitalize'>
                                        <SelectValue placeholder='Select a category' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {products?.map(product => (
                                        <SelectItem
                                            key={product.id}
                                            value={product.id.toString()}
                                            className='capitalize'>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='quantity'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='reorderLevel'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reorder Level</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='leadTime'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lead Time</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={loading} className='col-start-1'>
                    Submit
                </Button>
            </form>
        </Form>
    );
};
export default InventoryForm;
