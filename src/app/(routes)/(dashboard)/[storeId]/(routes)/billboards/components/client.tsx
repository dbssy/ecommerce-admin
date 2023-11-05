'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { BillboardColumn, columns } from './columns';

interface IBillboardClientProps {
  data: BillboardColumn[];
}

export function BillboardClient({ data }: IBillboardClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Anúncios (${data.length})`}
          description="Gerencie os anúncios da sua loja"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Novo
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />

      <Heading title="API" description="Chamadas à API para seus Anúncios" />

      <Separator />

      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
