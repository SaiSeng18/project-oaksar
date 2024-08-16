'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { InventoryType, ProductType } from '@/db/schema';

import CellAction from './cell-action';

export const columns: ColumnDef<Partial<InventoryType & { product: ProductType }>>[] = [
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
        accessorKey: 'product.name',
        header: 'Product',

        cell: ({ row }) => (
            <Link href={`/inventory/${row.original.id}`}>{row.original.product?.name}</Link>
        ),
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'reorderLevel',
        header: 'Reorder Level',
    },
    {
        accessorKey: 'leadTime',
        header: 'Lead Time',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
