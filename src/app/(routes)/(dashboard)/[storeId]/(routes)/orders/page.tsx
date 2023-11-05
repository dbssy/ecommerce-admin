import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { prismaClient } from '@/lib/prisma';
import { booleanFormatter, formatter } from '@/lib/utils';

import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';

interface IOrdersPageProps {
  params: {
    storeId: string;
  };
}

export default async function OrdersPage({ params }: IOrdersPageProps) {
  const orders = await prismaClient.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    phone: item.phone,
    address: item.address,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0),
    ),
    isPaid: booleanFormatter(item.isPaid),
    createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: ptBR }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
