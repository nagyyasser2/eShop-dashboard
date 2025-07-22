import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface ProductVariantForm {
  variantName: string;
  sku: string;
  additionalPrice: number;
  stock: number;
}

interface CreateProductVariantFormProps {
  productId?: string; // Optional productId for context
  variantId?: string; // Optional variantId for editing
  defaultValues?: Partial<ProductVariantForm>; // For editing existing variants
}

const CreateProductVariantForm: React.FC<CreateProductVariantFormProps> = ({
  productId,
  variantId,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductVariantForm>({
    defaultValues: defaultValues || {
      variantName: "",
      sku: "",
      additionalPrice: 0,
      stock: 0,
    },
  });

  const onSubmit: SubmitHandler<ProductVariantForm> = (data) => {
    console.log(variantId ? "Update Variant:" : "New Variant:", data);
    // Add API call to create or update variant here
    reset();
  };

  return (
    <div className="flex-1 pl-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBagIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            {variantId ? "Edit Variant" : "Create Variant"}
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {variantId ? "Update Variant Details" : "Add New Variant"}
          </h2>
          <div className="max-w-md">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="variantName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Variant Name
                </label>
                <input
                  id="variantName"
                  type="text"
                  {...register("variantName", {
                    required: "Variant name is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
                {errors.variantName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.variantName.message}
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
                  {...register("sku", { required: "SKU is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
                {errors.sku && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.sku.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="additionalPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Price
                </label>
                <input
                  id="additionalPrice"
                  type="number"
                  step="0.01"
                  {...register("additionalPrice", {
                    required: "Additional price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
                {errors.additionalPrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.additionalPrice.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    min: { value: 0, message: "Stock cannot be negative" },
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <a
                href={`/products${productId ? `/${productId}` : ""}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </a>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                {variantId ? "Update Variant" : "Create Variant"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductVariantForm;
