'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ColorColumn, columns } from './columns';

interface IColorClientProps {
  data: ColorColumn[];
}

export function ColorClient({ data }: IColorClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cores (${data.length})`}
          description="Gerencie as cores dos seus produtos"
        />

        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Nova
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="Chamadas à API para suas Cores" />

      <Separator />

      <ApiList entityName="colors" entityIdName="sizeId" />
    </>
  );
}
