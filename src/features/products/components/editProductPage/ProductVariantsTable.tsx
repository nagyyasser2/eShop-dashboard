import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { UpdateVariantDto } from "../../../../types";

interface ProductVariantsTableProps {
  variants: UpdateVariantDto[];
  onAddVariant: () => void;
  onEditVariant: (index: number) => void;
  onDeleteVariant: (index: number) => void;
  onRestoreVariant: (index: number) => void;
}

const ProductVariantsTable: React.FC<ProductVariantsTableProps> = ({
  variants,
  onAddVariant,
  onEditVariant,
  onDeleteVariant,
  onRestoreVariant,
}) => {
  const isVariantMarkedForDeletion = (variant: UpdateVariantDto) => {
    return variant.id !== undefined && variant.id < 0;
  };

  const getVariantDisplayName = (variant: UpdateVariantDto) => {
    const parts = [];
    if (variant.color) parts.push(variant.color);
    if (variant.size) parts.push(variant.size);
    return parts.length > 0 ? parts.join(" / ") : "Variant";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4 gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700">
          Product Variants
        </h3>
        <button
          type="button"
          className="px-2 py-1 cursor-pointer text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          onClick={onAddVariant}
        >
          Add Variant
        </button>
      </div>

      {variants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variant
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {variants.map((variant, index) => (
                <tr
                  key={`variant-${variant.id}-${index}`}
                  className={
                    isVariantMarkedForDeletion(variant)
                      ? "opacity-50 bg-red-50"
                      : ""
                  }
                >
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getVariantDisplayName(variant)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.sku}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${variant.price || "0.00"}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.stockQuantity}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isVariantMarkedForDeletion(variant) ? (
                      <span className="text-red-600 font-medium">
                        Marked for deletion
                      </span>
                    ) : variant.id === 0 ? (
                      <span className="text-green-600 font-medium">New</span>
                    ) : (
                      <span className="text-gray-600">Existing</span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isVariantMarkedForDeletion(variant) ? (
                      <button
                        type="button"
                        onClick={() => onRestoreVariant(index)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Restore
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onEditVariant(index)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteVariant(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No variants added yet.</p>
      )}
    </div>
  );
};

export default ProductVariantsTable;
