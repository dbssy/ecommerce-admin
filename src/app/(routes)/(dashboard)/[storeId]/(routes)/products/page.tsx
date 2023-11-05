import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { prismaClient } from '@/lib/prisma';
import { booleanFormatter, formatter } from '@/lib/utils';

import { ProductClient } from './components/client';
import { ProductColumn } from './components/columns';

interface IProductsPageProps {
  params: {
    storeId: string;
  };
}

export default async function ProductsPage({ params }: IProductsPageProps) {
  const products = await prismaClient.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: booleanFormatter(item.isFeatured),
    isArchived: booleanFormatter(item.isArchived),
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
