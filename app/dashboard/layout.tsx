import type { Metadata } from 'next';
import Sidebar from '../_components/sidebar';
import { Toaster } from '../_components/ui/sonner';

export const metadata: Metadata = {
  title: 'E-Stockly App',
  description: 'E-Stockly App, é uma aplicação para gerenciar vendas e estoque',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full">
      <div>
        <div className="flex min-h-[100vh] w-full bg-gray-100">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </div>
    </main>
  );
}
