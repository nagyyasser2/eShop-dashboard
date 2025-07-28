import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteProductMutation } from "../../../app/api/productsApi";
import { useState } from "react";
import { toast } from "react-toastify";
import type { ProductDto } from "../../../types";

interface ProductItemProps {
  product: ProductDto;
}

const ProductsItem = ({ product }: ProductItemProps) => {
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await deleteProduct(product.id).unwrap();
        setDeleteError(null);
        toast.success("Product deleted successfuly.");
      } catch (err) {
        setDeleteError("Failed to delete product. Please try again.");
        toast.error("Unable to delete product");
      }
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <Link
          to={`/products/${product.id}/edit`}
          className="hover:text-blue-600"
        >
          {product.name}
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        ${product.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.stockQuantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={`text-red-600 hover:text-red-800 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </button>
        {deleteError && (
          <p className="text-red-500 text-xs mt-1">{deleteError}</p>
        )}
      </td>
    </tr>
  );
};

export default ProductsItem;
