import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "../../app/api/categoriesApi";
import type { Category } from "../../types/categories.types";
import { SERVER_BASE_URL } from "../../utils/constants";

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

  const isEditMode = !!categoryId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>({
    defaultValues: {
      Name: "",
      Description: "",
      IsActive: true,
      SortOrder: 0,
    },
  });

  const [createCategory, { isLoading: isCreating, error: createError }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating, error: updateError }] =
    useUpdateCategoryMutation();

  // Fetch existing category data if editing
  const { data: existingCategory, isLoading: isFetchingCategory } =
    useGetCategoryQuery(
      { id: categoryId!, includeSubCategories: false },
      { skip: !categoryId }
    );

  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  // Populate form with existing data when editing
  useEffect(() => {
    if (existingCategory && isEditMode) {
      reset({
        Name: existingCategory.Name,
        Description: existingCategory.Description,
        IsActive: existingCategory.IsActive,
        SortOrder: existingCategory.SortOrder,
      });

      // Set existing images if available
      if (existingCategory.ImageUrls && existingCategory.ImageUrls.length > 0) {
        setExistingImages(existingCategory.ImageUrls);
      }
    } else if (!isEditMode) {
      // Reset to default values when creating
      reset({
        Name: "",
        Description: "",
        IsActive: true,
        SortOrder: 0,
      });
      setFilePreviews([]);
      setExistingImages([]);
      setImagesToRemove([]);
      setNewImageFiles([]);
    }
  }, [existingCategory, isEditMode, reset]);

  useEffect(() => {
    return () => {
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [filePreviews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Revoke old previews
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));

      // Create new previews
      const filesArray = Array.from(files).slice(0, 5);
      const previews = filesArray.map((file) => URL.createObjectURL(file));

      setNewImageFiles(filesArray);
      setFilePreviews(previews);
    }
  };

  const handleRemoveExistingImage = (imageUrl: string) => {
    setExistingImages((prev) => prev.filter((url) => url !== imageUrl));
    setImagesToRemove((prev) => [...prev, imageUrl]);
  };

  const onSubmit: SubmitHandler<Category> = async (data) => {
    try {
      if (isEditMode) {
        // Update category
        const categoryDto = {
          Id: data.Id,
          Name: data.Name,
          Description: data.Description,
          IsActive: data.IsActive,
          SortOrder: data.SortOrder,
          ImageFiles: newImageFiles,
          imageUrlsToRemove: imagesToRemove,
        };

        await updateCategory({ id: categoryId!, categoryDto }).unwrap();
      } else {
        // Create category
        const categoryDto = {
          Name: data.Name,
          Description: data.Description,
          IsActive: data.IsActive,
          SortOrder: data.SortOrder,
          ImageFiles: newImageFiles,
        };

        await createCategory(categoryDto).unwrap();
      }

      // Clean up and close modal
      filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setFilePreviews([]);
      setExistingImages([]);
      setImagesToRemove([]);
      setNewImageFiles([]);
      reset();
      onClose();
    } catch (err: any) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} category:`,
        err
      );
    }
  };

  const handleClose = () => {
    filePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    setFilePreviews([]);
    setExistingImages([]);
    setImagesToRemove([]);
    setNewImageFiles([]);
    reset();
    onClose();
  };

  const isLoading = isCreating || isUpdating || isFetchingCategory;
  const error = createError || updateError;

  const errorMessage = error
    ? "status" in error
      ? (error.data as any)?.message ||
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the category`
      : "An unexpected error occurred"
    : null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-opacity duration-150 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <TagIcon className="h-6 w-6 text-teal-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              {isEditMode ? "Edit Category" : "Create Category"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {isFetchingCategory ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">Loading category...</p>
            </div>
          ) : (
            <form
              id="categoryForm"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("Name", {
                    required: "Category name is required",
                    maxLength: {
                      value: 100,
                      message: "Category name cannot exceed 100 characters",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {errors.Name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.Name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="Description"
                  {...register("Description")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="isActive"
                  type="checkbox"
                  {...register("IsActive")}
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
                  {...register("SortOrder", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Sort order must be positive" },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {errors.SortOrder && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.SortOrder.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images
                </label>

                {/* Existing Images */}
                {isEditMode && existingImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Current Images:
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {existingImages.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={SERVER_BASE_URL + imageUrl}
                            alt={`Existing ${index}`}
                            className="h-24 w-24 object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(imageUrl)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Upload */}
                <input
                  id="imageFiles"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />

                {/* New Images Preview */}
                {filePreviews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">New Images:</p>
                    <div className="flex flex-wrap gap-4">
                      {filePreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index}`}
                          className="h-24 w-24 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="categoryForm"
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition duration-200`}
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
              ? "Update Category"
              : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryFormModal);
