import React from 'react';
import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from 'lucide-react';

import SidebarButton from './sidebar-button';
const Sidebar = () => {
  return (
    <div className="min-h-96 w-64 bg-white p-5">
      <div className="px-8 py-6">
        <h1 className="texy-2xl font-bold">E-STOCKLY</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/dashboard">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/dashboard/products">
          <PackageIcon size={20} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/dashboard/sales">
          <ShoppingBasketIcon size={20} />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
