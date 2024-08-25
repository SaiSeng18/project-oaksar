'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';

import { createCategory } from '@/actions/category';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    phone: z.string().min(2),
    email: z.string().min(2),
    description: z.string(),
});

const SuppliersForm = () => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            description: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const res = await axios.post('/api/supplier', {
                name: values.name,
                phone: values.phone,
                email: values.email,
                description: values.description,
            });
            console.log(res);
            setLoading(false);

            router.push('/orders/suppliers');
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
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Supplier Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Description' className='h-28' {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' disabled={loading}>
                    Submit
                </Button>
            </form>
        </Form>
    );
};
export default SuppliersForm;
