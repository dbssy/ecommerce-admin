import { prismaClient } from '@/lib/prisma';

export async function getSalesCount(storeId: string) {
  const salesCount = await prismaClient.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
}
