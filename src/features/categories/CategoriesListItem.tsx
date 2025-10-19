import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useDeleteCategoryMutation } from "../../app/api/categoriesApi";
import { toast } from "react-toastify";
import type { Category } from "../../types/categories.types";
import CategoryFormModal from "./CategoryFormModal";
import { useState } from "react";

interface CategoriesListItemProps {
  category: Category;
}

const CategoriesListItem = ({
  category: { Id, IsActive, Description, ImageUrls, Name },
}: CategoriesListItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        toast.success(`Category deleted successfully`);
      } catch (err: any) {
        toast.error(err.data);
        console.error("Failed to delete category:", err);
      }
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border  "bg-red-100 border-red-200"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 `}></span>
          {Name}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
            IsActive
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              IsActive ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          {IsActive ? "Active" : "Inactive"}
        </span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">
        <div className="max-w-xs">
          {/* Description */}
          <div className="truncate">
            {Description || (
              <span className="text-gray-400 italic">No description</span>
            )}
          </div>

          {/* Additional info */}
          <div className="flex items-center space-x-3 mt-1">
            {ImageUrls.length > 0 && (
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                {ImageUrls.length} image{ImageUrls.length === 1 ? "" : "s"}
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center space-x-2">
          {/* Edit button */}
          <button
            onClick={openModal}
            className="inline-flex items-center cursor-pointer px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors duration-150"
            aria-label={`Edit category ${name}`}
          >
            <PencilIcon className="h-3 w-3 mr-1" />
            Edit
          </button>

          {/* Delete button */}
          <button
            onClick={() => handleDelete(Id)}
            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 text-red-500 border border-red-500 cursor-pointer`}
            aria-label={`Delete category ${name}`}
            title={"Delete category"}
          >
            <TrashIcon className="h-3 w-3 mr-1" />
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </td>
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        categoryId={Id}
      />
    </tr>
  );
};

export default CategoriesListItem;
