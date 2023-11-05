import { prismaClient } from '@/lib/prisma';

import { ProductForm } from './components/product-form';

interface IProductPageProps {
  params: {
    productId: string;
    storeId: string;
  };
}

export default async function ProductPage({ params }: IProductPageProps) {
  const product = await prismaClient.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismaClient.category.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: 'asc',
    },
  });

  const sizes = await prismaClient.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: 'asc',
    },
  });

  const colors = await prismaClient.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}
