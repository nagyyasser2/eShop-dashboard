import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import ProductsList from "./components/ProductsList";

const Products: React.FC = () => {
  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ShoppingBagIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Product Management
              </h2>
              <p className="text-sm text-gray-500">
                Manage your product catalog here.
              </p>
            </div>
            <div>
              <a
                href="/products/create"
                className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              >
                Add New Product
              </a>
            </div>
          </div>
          <ProductsList />
        </div>
      </div>
    </div>
  );
};

export default Products;
