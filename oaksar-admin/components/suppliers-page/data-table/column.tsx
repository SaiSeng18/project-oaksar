'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { SupplierType } from '@/db/schema';

import CellAction from './cell-action';

export type SupplierTableProps = SupplierType;

export const SupplierColumns: ColumnDef<Partial<SupplierTableProps>>[] = [
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
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <div>{row.original.description || 'N/A'}</div>,
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
