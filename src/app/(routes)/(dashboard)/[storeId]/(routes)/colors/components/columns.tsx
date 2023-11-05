'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellActions } from './cell-actions';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'value',
    header: 'Cor',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}

        <div
          className="rounded-full border w-6 h-6"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
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
