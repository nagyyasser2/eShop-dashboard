import React from "react";
import { type UseFormReturn } from "react-hook-form";
import type { UpdateProductDto } from "../../../../types";
import FormField from "./FormField";

interface BasicProductFieldsProps {
  form: UseFormReturn<UpdateProductDto>;
}

const BasicProductFields: React.FC<BasicProductFieldsProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          id="name"
          label="Product Name"
          type="text"
          register={register("name", {
            required: "Product name is required",
            maxLength: {
              value: 200,
              message: "Product name cannot exceed 200 characters",
            },
          })}
          error={errors.name}
        />

        <FormField
          id="sku"
          label="SKU"
          type="text"
          register={register("sku", {
            required: "SKU is required",
            maxLength: {
              value: 100,
              message: "SKU cannot exceed 100 characters",
            },
          })}
          error={errors.sku}
        />

        <FormField
          id="price"
          label="Price"
          type="number"
          step="0.01"
          register={register("price", {
            required: "Price is required",
            min: {
              value: 0.01,
              message: "Price must be greater than 0",
            },
          })}
          error={errors.price}
        />

        <FormField
          id="stockQuantity"
          label="Stock Quantity"
          type="number"
          register={register("stockQuantity", {
            required: "Stock quantity is required",
            min: {
              value: 0,
              message: "Stock quantity cannot be negative",
            },
          })}
          error={errors.stockQuantity}
        />

        <FormField
          id="comparePrice"
          label="Compare Price"
          type="number"
          step="0.01"
          register={register("comparePrice", {
            min: {
              value: 0.01,
              message: "Compare price must be greater than 0",
            },
          })}
          error={errors.comparePrice}
        />
      </div>
    </div>
  );
};

export default BasicProductFields;
