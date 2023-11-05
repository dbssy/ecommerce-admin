import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { ModalProvider } from '@/providers/modal';
import { ThemeProvider } from '@/providers/theme';
import { ToasterProvider } from '@/providers/toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Painel Administrativo | STORE',
  description: 'Gerencie sua loja através deste painel sofisticado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ModalProvider />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
