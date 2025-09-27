import React from "react";
import { type UseFormReturn } from "react-hook-form";
import FormField from "./FormField";
import type { UpdateProductDto } from "../../../../types";

interface ProductDetailsFieldsProps {
  form: UseFormReturn<UpdateProductDto>;
}

const ProductDetailsFields: React.FC<ProductDetailsFieldsProps> = ({
  form,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Product Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="sm:col-span-2">
          <FormField
            id="description"
            label="Description"
            type="textarea"
            rows={4}
            register={register("description")}
            error={errors.description}
          />
        </div>

        <FormField
          id="shortDescription"
          label="Short Description"
          type="text"
          register={register("shortDescription")}
          error={errors.shortDescription}
        />

        <FormField
          id="weight"
          label="Weight"
          type="number"
          step="0.01"
          register={register("weight", {
            min: { value: 0, message: "Weight cannot be negative" },
          })}
          error={errors.weight}
        />

        <FormField
          id="dimensions"
          label="Dimensions"
          type="text"
          register={register("dimensions")}
          error={errors.dimensions}
        />

        <FormField
          id="tags"
          label="Tags"
          type="text"
          register={register("tags")}
          error={errors.tags}
        />
      </div>
    </div>
  );
};

export default ProductDetailsFields;
