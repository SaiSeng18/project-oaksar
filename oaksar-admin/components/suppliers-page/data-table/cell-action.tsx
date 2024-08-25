'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import AlertModal from '@/components/ui/alert-modal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/db';
import { category, CategoryType } from '@/db/schema';
import { cn } from '@/lib/utils';

interface CellActionProps {
    data: Partial<CategoryType>;
}

export default function CellAction({ data }: CellActionProps) {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            description: 'Copied',
            duration: 3000,
            className: cn('top-5 right-5 flex fixed max-w-[420px] md:top-4 md:right-4'),
        });
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/supplier/${data.id}`);

            router.refresh();
        } catch (error) {
            toast({
                description: 'Fail to delete supplier',
                duration: 3000,
                className: cn('top-5 right-5 flex fixed max-w-[420px] md:top-4 md:right-4'),
            });
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open Menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id!.toString())}>
                        <Copy className='mr-2 h-4 w-4' />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            router.push(`/inventory/categories/edit/${data.id!.toString()}`);
                        }}>
                        <Edit className='mr-2 h-4 w-4' />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='mr-2 h-4 w-4' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
