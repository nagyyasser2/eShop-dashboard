import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { type UpdateProductDto } from "../../../types/index";
import VariantFormModal from "../components/VariantFormModal";
import CategorySelection from "../components/CategorySelection";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../app/api/productsApi";
import { toast } from "react-toastify";
import EditProductPageHeader from "../components/EditProductPageHeader";
import BasicProductFields from "../components/editProductPage/BasicProductFields";
import ProductDetailsFields from "../components/editProductPage/ProductDetailsFields";
import ProductConfigFields from "../components/editProductPage/ProductConfigFields";
import ProductImageManager from "../components/editProductPage/ProductImageManager";
import ProductVariantsTable from "../components/editProductPage/ProductVariantsTable";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || "0", 10);
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<UpdateProductDto>({
    defaultValues: {
      id: productId,
      name: "",
      sku: "",
      price: 0,
      stockQuantity: 0,
      trackQuantity: true,
      isActive: true,
      isFeatured: false,
      weight: 0,
      newImages: [],
      imageIdsToDelete: [],
      variants: [],
    },
  });

  const { handleSubmit, control, reset, setValue } = form;

  const {
    fields: variants,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    if (product) {
      reset({
        id: product.id,
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        sku: product.sku,
        price: product.price,
        comparePrice: product.comparePrice,
        stockQuantity: product.stockQuantity,
        trackQuantity: product.trackQuantity,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        weight: product.weight,
        dimensions: product.dimensions,
        tags: product.tags,
        categoryId: product.categoryId,
        variants: product.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          price: v.price,
          stockQuantity: v.stockQuantity,
          isActive: v.isActive,
          color: v.color,
          size: v.size,
        })),
        newImages: [],
        imageIdsToDelete: [],
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<UpdateProductDto> = async (data) => {
    try {
      const formData: UpdateProductDto = {
        ...data,
        newImages: selectedImages,
        imageIdsToDelete,
        variants: data.variants || [],
      };
      await updateProduct(formData).unwrap();
      setSelectedImages([]);
      setImageIdsToDelete([]);
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  if (isLoading) return <LoadingProduct />;
  if (error) return <ErrorLoadingProduct error={error} />;
  if (!product) return null;

  return (
    <div className="flex-1 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <EditProductPageHeader />
        <FormContainer>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <BasicProductFields form={form} />
            <ProductDetailsFields form={form} />
            <ProductConfigFields form={form} />
            <CategorySelection
              form={form}
              initialCategoryId={product.categoryId}
            />
            <ProductImageManager
              product={product}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              imageIdsToDelete={imageIdsToDelete}
              setImageIdsToDelete={setImageIdsToDelete}
            />
            <ProductVariantsTable
              variants={variants}
              onAddVariant={() => {
                setEditingIndex(null);
                setIsModalOpen(true);
              }}
              onEditVariant={(index) => {
                setEditingIndex(index);
                setIsModalOpen(true);
              }}
              onDeleteVariant={(index) => {
                const variant = variants[index];
                if (variant.id && variant.id > 0) {
                  update(index, { ...variant, id: -Math.abs(variant.id) });
                } else {
                  remove(index);
                }
              }}
              onRestoreVariant={(index) => {
                const variant = variants[index];
                if (variant.id && variant.id < 0) {
                  update(index, { ...variant, id: Math.abs(variant.id) });
                }
              }}
            />
            <FormActions isUpdating={isUpdating} />
          </form>
        </FormContainer>
      </div>

      <VariantFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={(data) => {
          if (editingIndex !== null) {
            const existingVariant = variants[editingIndex];
            update(editingIndex, {
              ...data,
              id: existingVariant.id,
            });
          } else {
            append({ ...data, id: 0 });
          }
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        defaultValues={
          editingIndex !== null && variants[editingIndex]
            ? {
                ...variants[editingIndex],
                sku: variants[editingIndex].sku ?? "",
                price: variants[editingIndex].price ?? 0,
                stockQuantity: variants[editingIndex].stockQuantity ?? 0,
                isActive: variants[editingIndex].isActive ?? true,
                color: variants[editingIndex].color ?? "",
                size: variants[editingIndex].size ?? "",
              }
            : undefined
        }
      />
    </div>
  );
};

function ErrorLoadingProduct({ error }: { error: any }) {
  return (
    <div className="text-center py-4 text-red-500">
      <p>Error loading product: {error.toString()}</p>
    </div>
  );
}

function LoadingProduct() {
  return (
    <div className="text-center py-4">
      <p>Loading product...</p>
    </div>
  );
}

function FormActions({ isUpdating }: { isUpdating: boolean }) {
  return (
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
        className={`cursor-pointer px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 w-full sm:w-auto text-center ${
          isUpdating ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUpdating ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
}

type FormContainerProps = {
  children: React.ReactNode;
};

function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border border-gray-200">
      {children}
    </div>
  );
}
export default EditProductPage;
