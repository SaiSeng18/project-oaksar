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
import { CategoryType } from '@/db/schema';

import ColorPicker from './color-picker';
import ImageInput from './image-input';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    price: z.string().min(1),
    description: z.string().min(2).max(50),
    categoryId: z.string().min(1),
    imgUrls: z.string().array(),
    width: z.string(),
    height: z.string(),
    length: z.string(),
    weight: z.string(),
    colors: z.string().array(),
});

const ProductForm = ({ categories }: { categories: CategoryType[] }) => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            price: '',
            description: '',
            categoryId: '',
            imgUrls: [],
            width: '',
            height: '',
            length: '',
            weight: '',
            colors: [''],
        },
    });

    console.log(form.getValues('imgUrls'));

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const res = await axios.post('/api/products', { ...values });
            setLoading(false);

            router.push('/inventory/categories');
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
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
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
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className='capitalize'>
                                        <SelectValue placeholder='Select a category' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories?.map(category => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                            className='capitalize'>
                                            {category.name}
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
                    name='width'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Width</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='height'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='length'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Length</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='weight'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='colors'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Colors</FormLabel>
                            <FormDescription>
                                Please separate each color with a comma {'","'}.
                            </FormDescription>
                            <FormControl>
                                <ColorPicker onChange={field.onChange} value={field.value} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='imgUrls'
                    render={({ field }) => (
                        <FormItem className='col-span-2'>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <ImageInput
                                    value={field.value.map(url => url)}
                                    disabled={loading}
                                    onChange={
                                        url => field.onChange([...field.value, url])
                                        // form.setValue('imgUrls', [...field.value, url])
                                    }
                                    onRemove={
                                        url =>
                                            field.onChange([
                                                ...field.value.filter(current => current !== url),
                                            ])
                                        // form.setValue(
                                        //     'imgUrls',
                                        //     field.value.filter(current => current !== url)

                                        // )
                                    }
                                />
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
export default ProductForm;
