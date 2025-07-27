import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
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
  level?: number; // Added for hierarchy support
  hasChildren?: boolean; // Added to indicate if category has subcategories
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
  level = 0,
  hasChildren = false,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <div
          className="flex items-center space-x-2"
          style={{ paddingLeft: `${level * 1.5}rem` }}
        >
          {/* Hierarchy indicator */}
          {level > 0 && (
            <span className="text-gray-300 text-xs">{"└".repeat(1)}</span>
          )}

          {/* Category name */}
          <div className="flex items-center space-x-2">
            <Link
              to={`/categories/${id}/edit`}
              className={`hover:underline hover:text-blue-600 transition-colors ${
                level === 0 ? "font-semibold text-gray-800" : "text-gray-600"
              }`}
              onClick={onEdit}
            >
              {name}
            </Link>

            {/* Level indicator */}
            {level > 0 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-1 py-0.5 rounded">
                L{level + 1}
              </span>
            )}

            {/* Subcategory count */}
            {subCategoryCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                {subCategoryCount} sub{subCategoryCount === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
            isActive
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              isActive ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          {isActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="max-w-xs">
          {/* Description */}
          <div className="truncate">
            {description || (
              <span className="text-gray-400 italic">No description</span>
            )}
          </div>

          {/* Additional info */}
          <div className="flex items-center space-x-3 mt-1">
            {productCount > 0 && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {productCount} product{productCount === 1 ? "" : "s"}
              </span>
            )}

            {imageUrls.length > 0 && (
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                {imageUrls.length} image{imageUrls.length === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center space-x-2">
          {/* Edit button */}
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors duration-150"
            aria-label={`Edit category ${name}`}
          >
            <PencilIcon className="h-3 w-3 mr-1" />
            Edit
          </button>

          {/* Delete button */}
          <button
            onClick={onDelete}
            disabled={hasChildren}
            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 ${
              hasChildren
                ? "text-gray-400 bg-gray-50 border border-gray-200 cursor-not-allowed"
                : "text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300"
            }`}
            aria-label={`Delete category ${name}`}
            title={
              hasChildren
                ? "Cannot delete category with subcategories"
                : "Delete category"
            }
          >
            <TrashIcon className="h-3 w-3 mr-1" />
            {hasChildren ? "Protected" : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoriesListItem;
