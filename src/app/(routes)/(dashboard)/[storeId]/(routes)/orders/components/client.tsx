'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './columns';

interface IOrderClientProps {
  data: OrderColumn[];
}

export function OrderClient({ data }: IOrderClientProps) {
  return (
    <>
      <Heading
        title={`Pedidos (${data.length})`}
        description="Gerencie os pedidos da sua loja"
      />

      <Separator />

      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
}
