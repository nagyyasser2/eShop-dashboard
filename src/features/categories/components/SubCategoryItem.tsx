import React from "react";
import { useDeleteCategoryMutation } from "../../api/categoriesApi";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface SubCategoryItemProps {
  id: number;
  name: string;
  parentCategoryId: number;
  onDelete: () => void;
}

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({
  id,
  name,
  onDelete,
}) => {
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}" and all its contents? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteCategory(id).unwrap();
      toast.success(`"${name}" deleted successfully`);
      onDelete();
    } catch (error: any) {
      console.error("Deletion failed:", error);
      toast.error(`${error.data || name}`);
    }
  };

  return (
    <li className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150">
      <div className="flex items-center space-x-4">
        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-800 font-medium">
          {name.charAt(0).toUpperCase()}
        </span>
        <Link
          to={`/categories/${id}/edit`}
          className="text-gray-800 font-medium  hover:underline transition-colors duration-150"
        >
          {name}
        </Link>
      </div>

      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <a
          href={`/categories/${id}/edit`}
          className="p-2 text-gray-500 hover:text-teal-600 rounded-md hover:bg-teal-50 transition-colors"
          title="Edit"
        ></a>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`p-2 text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Delete"
        >
          {isDeleting ? (
            <span className="animate-pulse">...</span>
          ) : (
            <TrashIcon className="h-4 w-4 cursor-pointer" />
          )}
        </button>
      </div>
    </li>
  );
};

export default SubCategoryItem;
