import React, { useState, useEffect } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { useGetCategoriesQuery } from "../../app/api/categoriesApi";

interface CategorySelectionProps<T extends FieldValues = any> {
  form: UseFormReturn<T>;
  initialCategoryId?: number;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  form,
  initialCategoryId,
}) => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    initialCategoryId || null
  );

  // Watch the CategoryId field to sync with internal state
  const watchedCategoryId = watch("CategoryId");

  // Initialize form value when component mounts
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryId(initialCategoryId);
      setValue("CategoryId", initialCategoryId, { shouldValidate: true });
    }
  }, [initialCategoryId, setValue]);

  // Sync watched value with local state
  useEffect(() => {
    if (watchedCategoryId) {
      setSelectedCategoryId(watchedCategoryId);
    }
  }, [watchedCategoryId]);

  // Handle checkbox change to ensure single selection
  const handleCheckboxChange = (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      // Uncheck if the same category is clicked
      setSelectedCategoryId(null);
      setValue("CategoryId", undefined, { shouldValidate: true });
    } else {
      // Select new category
      setSelectedCategoryId(categoryId);
      setValue("CategoryId", categoryId, { shouldValidate: true });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category Selection
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="max-h-80 overflow-y-auto px-0 bg-white">
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
              <div
                key={category.Id}
                className="flex items-center space-x-2 text-gray-700  px-0 py-2 rounded"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id={`category-${category.Id}`}
                  checked={selectedCategoryId === category.Id}
                  onChange={() => handleCheckboxChange(category.Id)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600 flex-shrink-0"
                />

                {/* Category label */}
                <label
                  htmlFor={`category-${category.Id}`}
                  className="text-sm flex-1 cursor-pointer select-none"
                >
                  <span className="font-medium">{category.Name}</span>
                  {!category.IsActive && (
                    <span className="ml-2 text-xs text-red-500 font-medium">
                      (Inactive)
                    </span>
                  )}
                </label>
              </div>
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

      <input
        type="hidden"
        {...register("CategoryId", {
          required: "Please select a category",
          validate: (value) =>
            value !== undefined || "Please select a category",
        })}
      />

      {errors.CategoryId && (
        <p className="mt-2 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {typeof errors.CategoryId?.message === "string"
            ? errors.CategoryId.message
            : null}
        </p>
      )}
    </div>
  );
};

export default CategorySelection;
