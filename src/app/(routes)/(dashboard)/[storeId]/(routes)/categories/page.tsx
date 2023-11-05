import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { prismaClient } from '@/lib/prisma';

import { CategoryClient } from './components/client';
import { CategoryColumn } from './components/columns';

interface ICategoriesPageProps {
  params: {
    storeId: string;
  };
}

export default async function CategoriesPage({ params }: ICategoriesPageProps) {
  const categories = await prismaClient.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
