import React, { useState } from "react";
import {
  useGetCategoriesTreeQuery,
  type CategoryTreeDto,
} from "../../../app/api/categoriesApi";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { type UseFormSetValue } from "react-hook-form";

interface CategorySelectionProps {
  register: any; // From react-hook-form
  errors: any; // From react-hook-form
  setValue: UseFormSetValue<any>; // From react-hook-form
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  register,
  errors,
  setValue,
}) => {
  const { data: categories, isLoading, error } = useGetCategoriesTreeQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  // Toggle category expansion
  const toggleExpand = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Handle checkbox change to ensure single selection
  const handleCheckboxChange = (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      // Uncheck if the same category is clicked
      setSelectedCategoryId(null);
      setValue("categoryId", undefined);
    } else {
      // Select new category
      setSelectedCategoryId(categoryId);
      setValue("categoryId", categoryId);
    }
  };

  // Recursive component to render category and its subcategories
  const CategoryItem: React.FC<{
    category: CategoryTreeDto;
    level?: number;
  }> = ({ category, level = 0 }) => {
    const hasSubcategories =
      category.childCategories && category.childCategories.length > 0;
    const isExpanded = expandedCategories.has(category.id);

    return (
      <div className="py-1">
        <div
          className={`flex items-center space-x-2 ${
            level === 0
              ? "font-semibold text-gray-800 bg-gray-50 px-2 py-1 rounded"
              : "text-gray-700 hover:bg-gray-50 px-2 py-1 rounded"
          }`}
          style={{ marginLeft: `${level * 1.5}rem` }}
        >
          {/* Expand/Collapse button */}
          {hasSubcategories ? (
            <button
              type="button"
              onClick={() => toggleExpand(category.id)}
              className="text-gray-500 hover:text-gray-700 flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-4 h-4 flex-shrink-0" />
          )}

          {/* Checkbox */}
          <input
            type="checkbox"
            id={`category-${category.id}`}
            checked={selectedCategoryId === category.id}
            onChange={() => handleCheckboxChange(category.id)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 flex-shrink-0"
          />

          {/* Category label */}
          <label
            htmlFor={`category-${category.id}`}
            className="text-sm flex-1 cursor-pointer select-none"
          >
            <span className={level === 0 ? "font-medium" : "font-normal"}>
              {category.name}
            </span>
            {!category.isActive && (
              <span className="ml-2 text-xs text-red-500 font-medium">
                (Inactive)
              </span>
            )}
            {category.productCount > 0 && (
              <span className="ml-2 text-xs text-blue-600">
                ({category.productCount} products)
              </span>
            )}
          </label>
        </div>

        {/* Render subcategories */}
        {hasSubcategories && isExpanded && (
          <div className="mt-1 border-l-2 border-gray-200 ml-4">
            {category.childCategories.map((subCategory) => (
              <CategoryItem
                key={subCategory.id}
                category={subCategory}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Auto-expand categories that have active subcategories or are inactive with active children
  React.useEffect(() => {
    if (categories) {
      const categoriesToExpand = new Set<number>();

      const checkForExpansion = (cats: CategoryTreeDto[]) => {
        cats.forEach((cat) => {
          if (cat.childCategories && cat.childCategories.length > 0) {
            // Expand if category is inactive but has active children
            const hasActiveChildren = cat.childCategories.some(
              (child) => child.isActive
            );
            if (!cat.isActive && hasActiveChildren) {
              categoriesToExpand.add(cat.id);
            }
            // Recursively check children
            checkForExpansion(cat.childCategories);
          }
        });
      };

      checkForExpansion(categories);
      setExpandedCategories(categoriesToExpand);
    }
  }, [categories]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category Selection
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="ml-2 text-sm text-gray-500">
              Loading categories...
            </span>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-sm text-red-500 mb-2">
              Failed to load categories. Please try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-xs text-green-600 hover:text-green-700 underline"
            >
              Retry
            </button>
          </div>
        )}

        {categories && categories.length > 0 ? (
          <div className="space-y-2">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No categories available.</p>
            </div>
          )
        )}
      </div>

      {/* Hidden input to register categoryId with react-hook-form */}
      <input
        type="hidden"
        {...register("categoryId", {
          required: "Please select a category",
          valueAsNumber: true,
        })}
      />

      {errors.categoryId && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors.categoryId.message}
        </p>
      )}
    </div>
  );
};

export default CategorySelection;
