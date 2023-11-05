import { prismaClient } from '@/lib/prisma';

export async function getStockCount(storeId: string) {
  const stockCount = await prismaClient.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
}
