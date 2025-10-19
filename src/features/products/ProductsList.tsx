import React from "react";
import ProductItem from "./ProductsItem";
import { useGetProductsQuery } from "../../app/api/productsApi";
import type { ProductDto } from "../../types/products.types";

const ProductsList: React.FC = () => {
  const { data, error, isLoading } = useGetProductsQuery({});

  return (
    <div className="overflow-x-auto">
      {isLoading && (
        <div className="text-center py-4">
          <p>Loading products...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-4 text-red-500">
          <p>Error loading products: {error.toString()}</p>
        </div>
      )}
      {!isLoading && !error && data && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
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
            {data.data.map((product: ProductDto) => (
              <ProductItem key={product.Id} product={product} />
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && !error && data && data.data.length === 0 && (
        <div className="text-center py-4">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
