import React from "react";
import { CreditCardIcon } from "@heroicons/react/24/outline";

const Payments: React.FC = () => {
  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CreditCardIcon className="h-8 w-8 text-yellow-600" />
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Payment Management
            </h2>
            <p className="text-sm text-gray-500">
              View and manage payment records here.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    TXN-123456
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    John Doe
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    $199.99
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    Completed
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Refund
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

export default Payments;
