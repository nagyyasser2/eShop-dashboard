import React from "react";
import { type UseFormReturn } from "react-hook-form";
import type { UpdateProductDto } from "../../../../types";

interface ProductConfigFieldsProps {
  form: UseFormReturn<UpdateProductDto>;
}

const ProductConfigFields: React.FC<ProductConfigFieldsProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Configuration</h3>
      <div className="flex items-center space-x-6">
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
    </div>
  );
};

export default ProductConfigFields;
