import React, { useState } from "react";
import CategoriesListItem from "./CategoriesListItem";
import {
  useGetCategoriesTreeQuery,
  useDeleteCategoryMutation,
  type CategoryTreeDto,
  type CategoryDto,
} from "../../../app/api/categoriesApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Utility function to flatten the category tree
const flattenCategories = (
  categories: CategoryTreeDto[],
  parentName?: string
): CategoryDto[] => {
  return categories.reduce<CategoryDto[]>((acc, category) => {
    const categoryDto: CategoryDto = {
      id: category.id,
      name: category.name,
      description: category.description || "", // Not included in CategoryTreeDto
      imageUrls: [], // Not included in CategoryTreeDto
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      createdAt: "", // Not included, set empty string or fetch if needed
      parentCategoryId: undefined, // Set appropriately if needed
      parentCategoryName: parentName,
      childCategories: category.children
        ? category.children.map((child) => ({
            id: child.id,
            name: child.name,
            description: child.description || "",
            imageUrls: [],
            isActive: child.isActive,
            sortOrder: child.sortOrder,
            createdAt: "",
            parentCategoryId: undefined,
            parentCategoryName: category.name,
            childCategories: [], // Nested children will be handled in flattenCategories
            productCount: 0,
          }))
        : [],
      productCount: 0, // Not included in CategoryTreeDto, set to 0 or fetch if needed
    };

    // Add current category and recursively flatten its children
    return [
      ...acc,
      categoryDto,
      ...flattenCategories(category.children || [], category.name),
    ];
  }, []);
};

const CategoriesList = ({ openModal }: { openModal: () => void }) => {
  const { data: categoryTree, isLoading, error } = useGetCategoriesTreeQuery();

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const navigate = useNavigate();

  // Flatten the category tree into a list of CategoryDto
  const categories = categoryTree ? flattenCategories(categoryTree) : [];

  const handleEdit = (id: number) => {
    navigate(`/categories/${id}/edit`);
  };

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

  const errorMessage = error
    ? "status" in error
      ? (error.data as any)?.message ||
        "An error occurred while loading categories"
      : "An unexpected error occurred"
    : null;

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div className="text-red-600 text-center">
        Error loading categories: {errorMessage}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
          <p className="text-sm text-gray-500">
            View and manage categories here.
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
        >
          + Create Category
        </button>
      </div>

      {categories?.length === 0 ? (
        <p className="text-gray-500 text-center">No categories found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories?.map((category) => (
                <CategoriesListItem
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  imageUrls={category.imageUrls}
                  productCount={category.productCount}
                  subCategoryCount={category.childCategories?.length || 0}
                  isActive={category.isActive}
                  onEdit={() => handleEdit(category.id)}
                  onDelete={() => handleDelete(category.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
