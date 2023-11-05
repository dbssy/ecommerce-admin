'use client';

import { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
  id: string;
  products: string;
  phone: string;
  address: string;
  totalPrice: string;
  isPaid: boolean | string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Produtos',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Preço Total',
  },
  {
    accessorKey: 'isPaid',
    header: 'Pago',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
  },
];
