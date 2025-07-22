import React from "react";
import ProductVariantItem from "./ProductVariantItem";

// ...other imports

interface ProductVariantsListProps {
  productId?: number;
  variants: {
    id: number;
    variantName: string;
    sku: string;
    additionalPrice: number;
    stock: number;
  }[];
}

// ...component implementation

interface ProductVariant {
  id: number;
  variantName: string;
  sku: string;
  additionalPrice: number;
  stock: number;
}

const variants: ProductVariant[] = [
  {
    id: 1,
    variantName: "Sample Variant",
    sku: "VAR-001",
    additionalPrice: 10.0,
    stock: 50,
  },
];

const ProductVariantsList: React.FC<ProductVariantsListProps> = ({
  productId,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Product Variants
          </h2>
          <p className="text-sm text-gray-500">
            Manage your product variants here.
          </p>
        </div>
        <div>
          <a
            href={`/products${
              productId ? `/${productId}` : ""
            }/variants/create`}
            className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Add New Variant
          </a>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Additional Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variants.map((variant) => (
              <ProductVariantItem
                key={variant.id}
                variant={variant}
                productId={
                  productId !== undefined ? String(productId) : undefined
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariantsList;
