'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
import { product, ProductType, SupplierType } from '@/db/schema';
import { cn } from '@/lib/utils';

import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const formSchema = z.object({
    productId: z.string().min(1),
    supplierId: z.string().min(1),
    quantity: z.string(),
    orderDate: z.date(),
    expectedDeliveryDate: z.date(),
    status: z.string(),
    reorderLevel: z.string(),
});

const OrderForm = ({
    products,
    suppliers,
}: {
    products: ProductType[];
    suppliers: SupplierType[];
}) => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: '',
            supplierId: '',
            quantity: '',
            orderDate: new Date(),
            expectedDeliveryDate: new Date(),
            status: '',
            reorderLevel: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const res = await axios.post('/api/order', { ...values });
            setLoading(false);

            router.push('/orders');
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
                                        <SelectValue placeholder='Select a Product' />
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
                    name='supplierId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Supplier</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='capitalize'>
                                        <SelectValue placeholder='Select a Supplier' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {suppliers?.map(supplier => (
                                        <SelectItem
                                            key={supplier.id}
                                            value={supplier.id.toString()}
                                            className='capitalize'>
                                            {supplier.name}
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
                    name='orderDate'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Order Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'pl-3 text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}>
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start'>
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={date => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='expectedDeliveryDate'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Expected Delivery Date</FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'pl-3 text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}>
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start'>
                                    <Calendar
                                        mode='single'
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={date => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='capitalize'>
                                        <SelectValue placeholder='Status' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='pending' className='capitalize'>
                                        Pending
                                    </SelectItem>
                                    <SelectItem value='shipped' className='capitalize'>
                                        Shipped
                                    </SelectItem>
                                    <SelectItem value='received' className='capitalize'>
                                        Received
                                    </SelectItem>
                                </SelectContent>
                            </Select>

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
export default OrderForm;
