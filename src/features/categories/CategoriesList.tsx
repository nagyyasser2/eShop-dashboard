import React from "react";
import CategoriesListItem from "./CategoriesListItem";
import { useGetCategoriesQuery } from "../../app/api/categoriesApi";
import type { Category } from "../../types/categories.types";

const CategoriesList: React.FC = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

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
    <div className="overflow-x-auto">
      {data?.length === 0 ? (
        <p className="text-gray-500 text-center">No categories found.</p>
      ) : (
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
            {data?.map((category: Category) => (
              <CategoriesListItem key={category.Id} category={category} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesList;
