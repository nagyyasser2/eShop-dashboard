import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface ProductVariant {
  variantName: string;
  sku: string;
  additionalPrice: number;
  stock: number;
}

interface VariantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductVariant) => void;
  defaultValues?: ProductVariant;
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
  } = useForm<ProductVariant>({
    defaultValues: defaultValues || {
      variantName: "",
      sku: "",
      additionalPrice: 0,
      stock: 0,
    },
  });

  const handleFormSubmit: SubmitHandler<ProductVariant> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-50 ${
        isOpen
          ? "opacity-100 pointer-events-auto backdrop-blur-md"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blur overlay (clickable to close) */}
      <div
        className="absolute inset-0  bg-opacity-10 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div
        className={`relative bg-white rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {defaultValues ? "Edit Variant" : "Add New Variant"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Variant Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("variantName", {
                required: "Variant name is required",
              })}
            />
            {errors.variantName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.variantName.message}
              </p>
            )}
          </div>

          {/* SKU Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("sku", { required: "SKU is required" })}
            />
            {errors.sku && (
              <p className="mt-1 text-sm text-red-500">{errors.sku.message}</p>
            )}
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Price
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("additionalPrice", {
                required: "Additional price is required",
                min: { value: 0, message: "Price cannot be negative" },
              })}
            />
            {errors.additionalPrice && (
              <p className="mt-1 text-sm text-red-500">
                {errors.additionalPrice.message}
              </p>
            )}
          </div>

          {/* Stock Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock cannot be negative" },
              })}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
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
