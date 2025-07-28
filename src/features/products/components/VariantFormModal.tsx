import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateVariantDto } from "../../../types";

interface VariantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVariantDto) => void;
  defaultValues?: CreateVariantDto;
}

const VariantFormModal: React.FC<VariantFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVariantDto>({
    defaultValues: defaultValues || {
      sku: "",
      price: 0,
      stockQuantity: 0,
      isActive: true,
      color: "",
      size: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        defaultValues || {
          sku: "",
          price: 0,
          stockQuantity: 0,
          isActive: true,
          color: "",
          size: "",
        }
      );
    }
  }, [isOpen, defaultValues, reset]);

  const handleFormSubmit: SubmitHandler<CreateVariantDto> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-50 ${
        isOpen
          ? "opacity-100 pointer-events-auto backdrop-blur-sm"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blur overlay (clickable to close) */}
      <div
        className="absolute inset-0  bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div
        className={`relative bg-white rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg mx-4 shadow-2xl transform transition-all duration-50 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          {defaultValues ? "Edit Variant" : "Add New Variant"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* SKU Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                {...register("sku", {
                  required: "SKU is required",
                  maxLength: {
                    value: 100,
                    message: "SKU cannot exceed 100 characters",
                  },
                })}
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.sku.message}
                </p>
              )}
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                {...register("price", {
                  min: { value: 0, message: "Price cannot be negative" },
                })}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Stock Quantity Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                {...register("stockQuantity", {
                  required: "Stock quantity is required",
                  min: {
                    value: 0,
                    message: "Stock quantity cannot be negative",
                  },
                })}
              />
              {errors.stockQuantity && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>

            {/* Color Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                {...register("color")}
              />
              {errors.color && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.color.message}
                </p>
              )}
            </div>

            {/* Size Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
                {...register("size")}
              />
              {errors.size && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.size.message}
                </p>
              )}
            </div>

            {/* Is Active Field */}
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-3">
                Active
              </label>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                {...register("isActive")}
              />
              {errors.isActive && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.isActive.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto"
            >
              {defaultValues ? "Update Variant" : "Add Variant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VariantFormModal;
