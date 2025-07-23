import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TagIcon } from "@heroicons/react/24/outline";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../api/categoriesApi";
import CategoryFormModal from "../components/CategoryFormModal";
import SubCategoryItem from "../components/SubCategoryItem";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_BASE_URL } from "../../../utils/constants";
import type { CategoryForm } from "../utils/types";

const EditCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id || "0", 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const {
    data: category,
    refetch,
    isLoading,
    error,
  } = useGetCategoryQuery({
    id: categoryId,
    includeSubCategories: true,
  });

  // Define handleSubcategoryDeleted function
  const handleSubcategoryDeleted = () => {
    refetch();
  };

  const [updateCategory, { isLoading: isUpdating, error: updateError }] =
    useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CategoryForm>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      sortOrder: 0,
      parentCategoryId: undefined,
      imageFiles: undefined,
      imageUrlsToRemove: [],
    },
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description || "");
      setValue("isActive", category.isActive);
      setValue("sortOrder", category.sortOrder);
      setValue("parentCategoryId", category.parentCategoryId);
      setFilePreviews(
        category.imageUrls?.map((url) => `${SERVER_BASE_URL}/${url}`) || []
      );
    }
  }, [category, setValue]);

  useEffect(() => {
    return () => {
      filePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [filePreviews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFileArray = Array.from(files);
      const previews = newFileArray.map((file) => URL.createObjectURL(file));
      setNewFiles((prev) => [...prev, ...newFileArray]);
      setFilePreviews((prev) => [...prev, ...previews]);
      setValue("imageFiles", files);
    }
  };

  const handleRemoveImage = (url: string) => {
    if (url.startsWith("blob:")) {
      const index = filePreviews.indexOf(url);
      setNewFiles((prev) => prev.filter((_, i) => i !== index));
      URL.revokeObjectURL(url);
    } else {
      const cleanUrl = url.replace(`${SERVER_BASE_URL}/`, "");
      setImagesToRemove((prev) => [...prev, cleanUrl]);
    }
    setFilePreviews((prev) => prev.filter((preview) => preview !== url));
  };

  const onSubmit: SubmitHandler<CategoryForm> = async (data) => {
    try {
      const categoryDto = {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
        parentCategoryId: data.parentCategoryId,
        imageFiles: newFiles,
        imageUrlsToRemove: imagesToRemove,
      };
      await updateCategory({ id: categoryId, categoryDto }).unwrap();
      toast.success("Category updated successfully");
      setNewFiles([]);
      setImagesToRemove([]);
      setFilePreviews(
        categoryDto.imageFiles?.map((file) => URL.createObjectURL(file)) || []
      );
      reset({
        ...data,
        imageFiles: undefined,
        imageUrlsToRemove: [],
      });
    } catch (err: any) {
      console.error("Failed to update category:", err);
      toast.error("Failed to update category");
    }
  };

  const errorMessage = error
    ? "status" in error
      ? (error.data as any)?.message ||
        "An error occurred while loading the category"
      : "An unexpected error occurred"
    : null;

  const updateErrorMessage = updateError
    ? "status" in updateError
      ? (updateError.data as any)?.message ||
        "An error occurred while updating the category"
      : "An unexpected error occurred"
    : null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error loading category: {errorMessage}</div>;
  }

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <TagIcon className="h-8 w-8 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          {updateErrorMessage && (
            <p className="text-red-600 mb-4">{updateErrorMessage}</p>
          )}
          <div>
            <div className="max-w-md space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="isActive"
                  className="block text-sm font-medium text-gray-700"
                >
                  Active
                </label>
                <input
                  id="isActive"
                  type="checkbox"
                  {...register("isActive")}
                  className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-600 border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="sortOrder"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sort Order
                </label>
                <input
                  id="sortOrder"
                  type="number"
                  {...register("sortOrder", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Sort order must be positive" },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600"
                />
                {errors.sortOrder && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="files"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload New Images
                </label>
                <input
                  id="files"
                  type="file"
                  multiple
                  accept="image/*"
                  {...register("imageFiles")}
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>
              {filePreviews.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Images
                  </label>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {filePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="h-24 w-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(preview)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-baseline gap-6 mb-2">
                  <label className="block text-sm font-medium text-gray-700 underline">
                    Subcategories
                  </label>
                  <p
                    className="text-teal-600 hover:text-teal-800 underline text-3xl cursor-pointer"
                    onClick={openModal}
                  >
                    +
                  </p>
                </div>
                {(category?.childCategories?.length ?? 0) > 0 ? (
                  <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                    {category?.childCategories?.map((subCategory) => (
                      <SubCategoryItem
                        key={subCategory.id}
                        id={subCategory.id}
                        name={subCategory.name}
                        parentCategoryId={categoryId}
                        onDelete={handleSubcategoryDeleted}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">
                    No subcategories available
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                onClick={handleSubmit(onSubmit)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  isUpdating
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } transition duration-200 cursor-pointer`}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        categoryId={categoryId}
      />
    </div>
  );
};

export default EditCategoryPage;
