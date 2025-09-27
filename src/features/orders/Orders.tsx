import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import OrdersList from "./OrdersList";

const Orders: React.FC = () => {
  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Order Management
            </h2>
            <p className="text-sm text-gray-500">
              View and manage customer orders here.
            </p>
          </div>
          <OrdersList />
        </div>
      </div>
    </div>
  );
};

export default Orders;
