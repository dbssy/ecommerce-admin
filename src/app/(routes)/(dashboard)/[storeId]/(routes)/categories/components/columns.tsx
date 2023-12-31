'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellActions } from './cell-actions';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'billboard',
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
