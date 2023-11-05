import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { prismaClient } from '@/lib/prisma';

import { BillboardClient } from './components/client';
import { BillboardColumn } from './components/columns';

interface IBillboardsPageProps {
  params: {
    storeId: string;
  };
}

export default async function BillboardsPage({ params }: IBillboardsPageProps) {
  const billboards = await prismaClient.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
