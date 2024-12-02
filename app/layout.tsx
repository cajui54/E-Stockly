import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './_components/sidebar';
import { Toaster } from './_components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'auto',
});
export const metadata: Metadata = {
  title: 'Stockly App',
  description: 'Stockly App, é uma aplicação para gerenciar vendas e estoque',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-full">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
