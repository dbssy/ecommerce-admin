'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellActions } from './cell-actions';

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Nome',
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
