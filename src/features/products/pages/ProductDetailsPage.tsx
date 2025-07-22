import React from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import ProductVariantsList from "../components/ProductVariantsList";
const ProductDetailsPage: React.FC = () => {
  const product = {
    id: 1,
    name: "Sample Product",
    price: 99.99,
    stock: 100,
    description: "This is a sample product description.",
  };

  // Example variants data
  const variants = [
    {
      id: 1,
      variantName: "Variant 1",
      sku: "SKU-001",
      additionalPrice: 0,
      stock: 50,
    },
    {
      id: 2,
      variantName: "Variant 2",
      sku: "SKU-002",
      additionalPrice: 10,
      stock: 30,
    },
  ];

  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBagIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {product.name}
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700">Price: </span>
              <span className="text-sm text-gray-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Stock: </span>
              <span className="text-sm text-gray-600">{product.stock}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">
                Description:
              </span>
              <span className="text-sm text-gray-600">
                {product.description}
              </span>
            </div>
            <div className="flex justify-end space-x-4">
              <a
                href="/products"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Back to Products
              </a>
              <a
                href={`/products/edit/${product.id}`}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Edit Product
              </a>
            </div>
          </div>
        </div>
        <ProductVariantsList productId={product.id} variants={variants} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
