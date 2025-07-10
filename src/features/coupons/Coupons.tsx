import React from "react";
import { TicketIcon } from "@heroicons/react/24/outline";

const Coupons: React.FC = () => {
  return (
    <div className="flex-1 pl-6 bg-zinc-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TicketIcon className="h-8 w-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Coupon Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage your discount coupons here.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    SAVE20
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    20% Off
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    2025-12-31
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
