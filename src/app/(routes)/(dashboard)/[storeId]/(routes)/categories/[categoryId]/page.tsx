import { prismaClient } from '@/lib/prisma';

import { CategoryForm } from './components/category-form';

interface ICategoryPageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

export default async function CategoryPage({ params }: ICategoryPageProps) {
  const category = await prismaClient.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismaClient.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}
