import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from './_components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'auto',
});
export const metadata: Metadata = {
  title: 'E-Stockly App',
  description: 'E-Stockly App, é uma aplicação para gerenciar vendas e estoque',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>
        <div className="h-full w-full">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
