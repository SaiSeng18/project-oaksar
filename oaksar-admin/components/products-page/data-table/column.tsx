'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { CategoryType, ProductType } from '@/db/schema';

import CellAction from './cell-action';

export type ProductTableProps = ProductType & { category: CategoryType };

export const ProductColumns: ColumnDef<Partial<ProductTableProps>>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <Link href={`/inventory/products/${row.original.id}`}>{row.original.name}</Link>
        ),
    },
    {
        accessorKey: 'category.name',
        header: 'Category',
        cell: ({ row }) => (
            <div className='capitalize'>
                {row.original.category?.name ? row.original.category?.name : 'N/A'}
            </div>
        ),
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
