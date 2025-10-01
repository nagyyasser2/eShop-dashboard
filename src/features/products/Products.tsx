import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import ProductsList from "./components/ProductsList";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="bg-white mx-auto rounded-lg p-6 border border-gray-200">
        <div className="flex gap-4 items-center text-lg font-semibold text-gray-700 mb-4">
          <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
          <div>
            <span>Product Management</span>
            <p className="text-sm text-gray-500">
              Manage your product catalog here.
            </p>
          </div>
          <div className="ml-auto">
            <Link
              to="/products/create"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              + Create Product
            </Link>
          </div>
        </div>
        <ProductsList />
      </div>
    </div>
  );
};

export default Products;
