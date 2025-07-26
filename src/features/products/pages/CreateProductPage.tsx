import React, { useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import {
  ShoppingBagIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import VariantFormModal from "../components/VariantFormModal";
import { Link } from "react-router-dom";
import {
  useCreateProductMutation,
  type CreateProductDto,
  type CreateVariantDto,
} from "../../../app/api/productsApi";

const CreateProductPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [createProduct, { isLoading: isCreating, error: createError }] =
    useCreateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CreateProductDto>({
    defaultValues: {
      name: "",
      sku: "",
      price: 0,
      stockQuantity: 0,
      trackQuantity: true,
      isActive: true,
      isFeatured: false,
      weight: 0,
      variants: [],
      images: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variants",
  });

  const handleVariantSubmit = (data: CreateVariantDto) => {
    if (editingIndex !== null) {
      update(editingIndex, data);
      setEditingIndex(null);
    } else {
      append(data);
    }
    setIsModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    try {
      const formData: CreateProductDto = {
        ...data,
        images: selectedImages,
      };
      await createProduct(formData).unwrap();
      setFormError(null);
      reset();
      setSelectedImages([]);
    } catch (err) {
      setFormError("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="flex-1  sm:p-6 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Create Product
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Product name is required",
                    maxLength: {
                      value: 200,
                      message: "Product name cannot exceed 200 characters",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700"
                >
                  SKU
                </label>
                <input
                  id="sku"
                  type="text"
                  {...register("sku", {
                    required: "SKU is required",
                    maxLength: {
                      value: 100,
                      message: "SKU cannot exceed 100 characters",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.sku && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.sku.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0.01,
                      message: "Price must be greater than 0",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock Quantity
                </label>
                <input
                  id="stockQuantity"
                  type="number"
                  {...register("stockQuantity", {
                    required: "Stock quantity is required",
                    min: {
                      value: 0,
                      message: "Stock quantity cannot be negative",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.stockQuantity && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                  rows={4}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="shortDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Description
                </label>
                <input
                  id="shortDescription"
                  type="text"
                  {...register("shortDescription")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.shortDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="comparePrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Compare Price
                </label>
                <input
                  id="comparePrice"
                  type="number"
                  step="0.01"
                  {...register("comparePrice", {
                    min: {
                      value: 0.01,
                      message: "Compare price must be greater than 0",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.comparePrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.comparePrice.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight
                </label>
                <input
                  id="weight"
                  type="number"
                  step="0.01"
                  {...register("weight", {
                    min: { value: 0, message: "Weight cannot be negative" },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dimensions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dimensions
                </label>
                <input
                  id="dimensions"
                  type="text"
                  {...register("dimensions")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.dimensions && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.dimensions.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  {...register("tags")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.tags.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category ID
                </label>
                <input
                  id="categoryId"
                  type="number"
                  {...register("categoryId")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm"
                />
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-6 sm:col-span-2">
                <div>
                  <label
                    htmlFor="trackQuantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Track Quantity
                  </label>
                  <input
                    id="trackQuantity"
                    type="checkbox"
                    {...register("trackQuantity")}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  {errors.trackQuantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.trackQuantity.message}
                    </p>
                  )}
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
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  {errors.isActive && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.isActive.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="isFeatured"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Featured
                  </label>
                  <input
                    id="isFeatured"
                    type="checkbox"
                    {...register("isFeatured")}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                  />
                  {errors.isFeatured && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.isFeatured.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Images
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {selectedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center mb-4 gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                  Product Variants
                </h3>
                <button
                  type="button"
                  className="px-2 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 cursor-pointer"
                  onClick={() => {
                    setEditingIndex(null);
                    setIsModalOpen(true);
                  }}
                >
                  +
                </button>
              </div>
              {fields.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Variant Name
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SKU
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Additional Price
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fields.map((variant, index) => (
                        <tr key={variant.id}>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {variant.color || variant.size || "Variant"}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {variant.sku}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${variant.price || "0.00"}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {variant.stockQuantity}
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingIndex(index);
                                setIsModalOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 mr-4"
                            >
                              <PencilIcon className="h-5 w-5 cursor-pointer" />
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5 cursor-pointer" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No variants added yet.</p>
              )}
            </div>

            {formError && (
              <p className="mt-4 text-sm text-red-500">{formError}</p>
            )}
            {createError && (
              <p className="mt-4 text-sm text-red-500">
                Error creating product: {createError.toString()}
              </p>
            )}

            <div className="flex justify-end space-x-4 mt-6">
              <Link
                to="/products"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 w-full sm:w-auto text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isCreating}
                className={`px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 w-full sm:w-auto text-center ${
                  isCreating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isCreating ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <VariantFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={handleVariantSubmit}
        defaultValues={editingIndex !== null ? fields[editingIndex] : undefined}
      />
    </div>
  );
};

export default CreateProductPage;
