import { prismaClient } from '@/lib/prisma';

import { SizeForm } from './components/size-form';

interface ISizePageProps {
  params: {
    sizeId: string;
  };
}

export default async function SizePage({ params }: ISizePageProps) {
  const size = await prismaClient.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
