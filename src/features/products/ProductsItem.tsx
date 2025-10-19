import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteProductMutation } from "../../app/api/productsApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import type { ProductDto } from "../../types/products.types";
import { setCurrentProduct } from "./productsSlice";

interface ProductItemProps {
  product: ProductDto;
}

const ProductsItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${product.Name}?`)) {
      try {
        await deleteProduct(product.Id).unwrap();
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
        <button onClick={() => dispatch(setCurrentProduct(product))}>
          <Link
            to={`/products/${product.Id}/edit`}
            className="hover:text-blue-600"
          >
            {product.Name}
          </Link>
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        ${product.Price?.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.StockQuantity}
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
