'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellActions } from './cell-actions';

export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean | string;
  isArchived: boolean | string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'isArchived',
    header: 'Arquivado',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Destaque',
  },
  {
    accessorKey: 'price',
    header: 'Preço',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'size',
    header: 'Tamanho',
  },
  {
    accessorKey: 'color',
    header: 'Cor',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}

        <div
          className="border rounded-full w-6 h-6"
          style={{ backgroundColor: row.original.color }}
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
