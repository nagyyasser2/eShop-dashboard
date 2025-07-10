import React from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

const Customers: React.FC = () => {
  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <UsersIcon className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Customer Management
            </h2>
            <p className="text-sm text-gray-500">
              View and manage customer information here.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    Jane Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    jane@example.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      View
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

export default Customers;
