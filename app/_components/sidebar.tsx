import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-5">
      <div className="px-8 py-6">
        <h1 className="texy-2xl font-bold">STOCKLY</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <button className="px-6 py-3">Dashboard</button>
        <button className="px-6 py-3">Products</button>
        <button className="px-6 py-3">Vendas</button>
      </div>
    </div>
  );
};

export default Sidebar;
