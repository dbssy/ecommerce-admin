import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { prismaClient } from '@/lib/prisma';

import { Navbar } from '@/components/navbar';

interface IDashboardLayoutProps {
  params: {
    storeId: string;
  };
  children: React.ReactNode;
}

export default async function DashboardLayout({
  params,
  children,
}: IDashboardLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismaClient.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
