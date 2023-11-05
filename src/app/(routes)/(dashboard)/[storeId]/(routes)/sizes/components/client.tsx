'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { SizeColumn, columns } from './columns';

interface ISizeClientProps {
  data: SizeColumn[];
}

export function SizeClient({ data }: ISizeClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tamanhos (${data.length})`}
          description="Gerencie os tamanhos da sua loja"
        />

        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Novo
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="Chamadas à API para seus Tamanhos" />

      <Separator />

      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
}
