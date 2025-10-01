import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import OrdersList from "./OrdersList";

const Orders: React.FC = () => {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="bg-white mx-auto  rounded-lg p-6 border border-gray-200 ">
        <div className="flex gap-4 items-center text-lg font-semibold text-gray-700 mb-4">
          <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
          <div>
            <span>Order Management</span>
            <p className="text-sm text-gray-500">
              View and manage customer orders here.
            </p>
          </div>
        </div>
        <OrdersList />
      </div>
    </div>
  );
};

export default Orders;
