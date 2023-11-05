import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { prismaClient } from '@/lib/prisma';

import { SizeClient } from './components/client';
import { SizeColumn } from './components/columns';

interface ISizesPageProps {
  params: {
    storeId: string;
  };
}

export default async function SizesPage({ params }: ISizesPageProps) {
  const sizes = await prismaClient.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}
