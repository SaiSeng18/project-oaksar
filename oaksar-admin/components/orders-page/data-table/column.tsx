'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { OrderType } from '@/db/schema/order';
import { cn } from '@/lib/utils';

import CellAction from './cell-action';

export const columns: ColumnDef<Partial<OrderType>>[] = [
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
    },
    {
        accessorKey: 'supplierId',
        header: 'Supplier',
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
    },
    {
        accessorKey: 'orderDate',
        header: 'Order Date',
        cell: ({ row }) => row.original.orderDate?.toLocaleDateString(),
    },
    {
        accessorKey: 'expectedDeliveryDate',
        header: 'Expected Delivery Date',
        cell: ({ row }) => row.original.expectedDeliveryDate?.toLocaleDateString(),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <div
                className={cn(
                    'inline rounded-full px-2 py-1 capitalize',
                    row.original.status === 'pending' && 'bg-yellow-100 text-yellow-500',
                    row.original.status === 'shipped' && 'bg-green-100 text-green-500',
                    row.original.status === 'received' && 'bg-blue-100 text-blue-500'
                )}>
                {row.original.status}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
