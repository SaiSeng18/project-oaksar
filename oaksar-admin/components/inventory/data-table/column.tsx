'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { InventoryType, ProductType } from '@/db/schema';

import CellAction from './cell-action';

export const columns: ColumnDef<Partial<InventoryType & ProductType>>[] = [
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
        accessorKey: 'inventoryId',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Quantity',
    },
    {
        accessorKey: 'reorderPoint',
        header: 'Reorder Point',
    },
    {
        accessorKey: 'safetyStock',
        header: 'Safety Stock',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
