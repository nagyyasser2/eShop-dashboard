import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductsItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <a href={`/products/${product.id}`} className="hover:text-blue-600">
          {product.name}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        ${product.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <a
          href={`/products/edit/${product.id}`}
          className="text-blue-600 hover:text-blue-800 mr-2"
        >
          Edit
        </a>
        <button className="text-red-600 hover:text-red-800">Delete</button>
      </td>
    </tr>
  );
};

export default ProductsItem;
