import React from "react";

interface ProductVariant {
  id: number;
  variantName: string;
  sku: string;
  additionalPrice: number;
  stock: number;
}

interface ProductVariantItemProps {
  variant: ProductVariant;
  productId?: string;
}

const ProductVariantItem: React.FC<ProductVariantItemProps> = ({
  variant,
  productId,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {variant.variantName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {variant.sku}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        ${variant.additionalPrice.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {variant.stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <a
          href={`/products${productId ? `/${productId}` : ""}/variants/edit/${
            variant.id
          }`}
          className="text-blue-600 hover:text-blue-800 mr-2"
        >
          Edit
        </a>
        <button className="text-red-600 hover:text-red-800">Delete</button>
      </td>
    </tr>
  );
};

export default ProductVariantItem;
