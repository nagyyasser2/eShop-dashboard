import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

interface CategoriesListItemProps {
  id: number;
  name: string;
  description?: string;
  imageUrls: string[];
  productCount: number;
  subCategoryCount: number;
  isActive: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const CategoriesListItem: React.FC<CategoriesListItemProps> = ({
  id,
  name,
  description,
  imageUrls,
  productCount,
  subCategoryCount,
  isActive,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <Link
          to={`/categories/${id}/edit`}
          replace
          onClick={onEdit}
          className=" hover:underline"
        >
          {name}
        </Link>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <span className={`px-2 py-1 rounded-full text-xs`}>
          {description || "No description"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 cursor-pointer"
          aria-label={`Delete category ${name}`}
        >
          <TrashIcon className="h-4 w-4 cursor-pointer" />
        </button>
      </td>
    </tr>
  );
};

export default CategoriesListItem;
