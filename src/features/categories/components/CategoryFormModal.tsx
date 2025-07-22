import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../api/categoriesApi";

interface CategoryForm {
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  parentCategoryId?: number;
  imageFiles?: FileList;
}

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: number;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  categoryId,
}) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryForm>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      sortOrder: 0,
      parentCategoryId: categoryId ?? undefined,
    },
  });

  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
  const navigate = useNavigate();
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [filePreviews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Clean up existing previews
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));

      const previews = Array.from(files)
        .slice(0, 5) // Limit to 5 previews
        .map((file) => URL.createObjectURL(file));
      setFilePreviews(previews);
    }
  };

  const onSubmit: SubmitHandler<CategoryForm> = async (data) => {
    try {
      // Create the same structure as EditCategoryPage
      const categoryDto = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
        parentCategoryId: data.parentCategoryId,
        imageFiles: data.imageFiles ? Array.from(data.imageFiles) : [],
      };

      await createCategory(categoryDto).unwrap();

      // Clean up and close modal
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setFilePreviews([]);
      reset();
      onClose();
    } catch (err: any) {
      console.error("Failed to create category:", err);
    }
  };

  const handleClose = () => {
    // Clean up previews when closing
    filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setFilePreviews([]);
    reset();
    onClose();
  };

  const errorMessage = error
    ? "status" in error
      ? (error.data as any)?.message ||
        "An error occurred while creating the category"
      : "An unexpected error occurred"
    : null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm transition-opacity duration-150 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-transform duration-150 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <TagIcon className="h-8 w-8 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Create Category
          </h2>
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Category name is required",
                maxLength: {
                  value: 100,
                  message: "Category name cannot exceed 100 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isActive"
              type="checkbox"
              {...register("isActive")}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-medium text-gray-700"
            >
              Active
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              id="sortOrder"
              type="number"
              {...register("sortOrder", {
                valueAsNumber: true,
                min: { value: 0, message: "Sort order must be positive" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.sortOrder && (
              <p className="mt-1 text-sm text-red-500">
                {errors.sortOrder.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <input
              id="imageFiles"
              type="file"
              multiple
              accept="image/*"
              {...register("imageFiles")}
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
            {filePreviews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {filePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } transition duration-200 cursor-pointer`}
            >
              {isLoading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(CategoryFormModal);
