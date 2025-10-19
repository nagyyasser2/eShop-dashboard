import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import type { UpdateProductDto } from "../../types/products.types";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectCurrentProduct } from "./productsSlice";
import {
  createProductFormData,
  useUpdateProductMutation,
} from "../../app/api/productsApi";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CheckboxInput from "./CheckboxInput";
import CategorySelection from "./CategorySelection";
import ProductImagesForm from "./ProductImagesForm";

const EditProductPage = () => {
  const product = useSelector(selectCurrentProduct);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const navigate = useNavigate();

  const form = useForm<UpdateProductDto>({
    defaultValues: product || {
      Id: 0,
      Name: "",
      Description: "",
      ShortDescription: "",
      Sku: "",
      Price: 0,
      ComparePrice: 0,
      StockQuantity: 0,
      TrackQuantity: true,
      IsActive: true,
      IsFeatured: false,
      Weight: 0,
      Dimensions: "",
      Tags: "",
      CategoryId: 0,
      ProductImages: [],
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (product && product.Id) {
      reset({
        Id: product.Id,
        Name: product.Name,
        Description: product.Description || "",
        ShortDescription: product.ShortDescription || "",
        Sku: product.Sku,
        Price: product.Price,
        ComparePrice: product.ComparePrice || 0,
        StockQuantity: product.StockQuantity,
        TrackQuantity: product.TrackQuantity,
        IsActive: product.IsActive,
        IsFeatured: product.IsFeatured,
        Weight: product.Weight,
        Dimensions: product.Dimensions || "",
        Tags: product.Tags || "",
        CategoryId: product.CategoryId,
        ProductImages: product.ProductImages || [],
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<UpdateProductDto> = async (data) => {
    try {
      const formData = createProductFormData({ ...data });
      await updateProduct(formData).unwrap();

      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to update product. Please try again.");
      console.error("UpdateProduct error:", err);
    }
  };

  if (!product || !product.Id)
    return <Navigate to={"/products"} replace={true} />;

  return (
    <div className="flex-1 bg-white">
      <div className="rounded-md mx-auto border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          <span className="text-lg font-semibold text-gray-700">
            Edit Product
          </span>
        </div>

        <div className="bg-white rounded-lg border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <TextInput
                id="name"
                label="Product Name"
                register={register("Name", {
                  required: "Product name is required",
                  maxLength: { value: 200, message: "Max 200 characters" },
                })}
                error={errors.Name}
              />

              <TextInput
                id="sku"
                label="Sku"
                register={register("Sku", {
                  required: "Sku is required",
                  maxLength: { value: 100, message: "Max 100 characters" },
                })}
                error={errors.Sku}
              />

              <TextInput
                id="price"
                label="Price"
                type="number"
                step="0.01"
                register={register("Price", {
                  required: "Price is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                })}
                error={errors.Price}
              />

              <TextInput
                id="stockQuantity"
                label="Stock Quantity"
                type="number"
                register={register("StockQuantity", {
                  required: "Stock quantity is required",
                  min: { value: 0, message: "Cannot be negative" },
                })}
                error={errors.StockQuantity}
              />

              <TextInput
                id="description"
                label="Description"
                type="textarea"
                register={register("Description")}
                error={errors.Description}
              />

              <TextInput
                id="shortDescription"
                label="Short Description"
                register={register("ShortDescription")}
                error={errors.ShortDescription}
              />

              <TextInput
                id="comparePrice"
                label="Compare Price"
                type="number"
                step="0.01"
                register={register("ComparePrice", {
                  min: { value: 0.01, message: "Must be greater than 0" },
                })}
                error={errors.ComparePrice}
              />

              <TextInput
                id="weight"
                label="Weight"
                type="number"
                step="0.01"
                register={register("Weight", {
                  min: { value: 0, message: "Cannot be negative" },
                })}
                error={errors.Weight}
              />

              <TextInput
                id="dimensions"
                label="Dimensions"
                register={register("Dimensions")}
                error={errors.Dimensions}
              />

              <TextInput
                id="tags"
                label="Tags"
                register={register("Tags")}
                error={errors.Tags}
              />

              <div className="flex items-center space-x-6 sm:col-span-2">
                <CheckboxInput
                  id="trackQuantity"
                  label="Track Quantity"
                  register={register("TrackQuantity")}
                  error={errors.TrackQuantity}
                />
                <CheckboxInput
                  id="isActive"
                  label="Active"
                  register={register("IsActive")}
                  error={errors.IsActive}
                />
                <CheckboxInput
                  id="isFeatured"
                  label="Featured"
                  register={register("IsFeatured")}
                  error={errors.IsFeatured}
                />
              </div>
            </div>

            {/* Category Selection */}
            <CategorySelection
              form={form}
              initialCategoryId={product.CategoryId}
            />

            {/* Product Images */}
            <ProductImagesForm
              productImages={product.ProductImages}
              onImagesChange={(images) => {
                form.setValue("ProductImages", images as any, {
                  shouldValidate: true,
                });
              }}
              isUpdate={true}
            />

            {/* Actions */}
            <div className="flex justify-end space-x-4 mt-6">
              <Link
                to="/products"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 w-full sm:w-auto text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUpdating}
                className={`px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 w-full sm:w-auto text-center ${
                  isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
