import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { prismaClient } from '@/lib/prisma';

import { MainNav } from '@/components/main-nav';
import { StoreSwitcher } from '@/components/store-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismaClient.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="h-16 px-4 flex items-center">
        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />

        <div className="flex items-center space-x-4 ml-auto">
          <ThemeToggle />

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
