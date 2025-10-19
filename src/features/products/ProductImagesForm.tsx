import { useState, useCallback } from "react";
import { TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";
import type {
  CreateProductImageDto,
  UpdateProductImageDto,
  ProductImageDto,
} from "../../types/products.types";
import { SERVER_BASE_URL } from "../../utils/constants";

interface ProductImagesProps {
  productImages?: ProductImageDto[];
  onImagesChange?: (
    images: (CreateProductImageDto | UpdateProductImageDto)[]
  ) => void;
  isUpdate?: boolean;
}

export default function ProductImagesForm({
  productImages = [],
  onImagesChange,
  isUpdate = false,
}: ProductImagesProps) {
  const [images, setImages] = useState<
    (CreateProductImageDto | UpdateProductImageDto)[]
  >(
    isUpdate
      ? productImages.map((img) => ({
          ...img,
          File: undefined,
          IsDeletable: false,
          Path: img.Path,
        }))
      : []
  );

  const [previews, setPreviews] = useState<string[]>(
    isUpdate ? productImages.map((img) => img.Path) : []
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      files.forEach((file, fileIndex) => {
        if (file.type.startsWith("image/")) {
          const newImage: CreateProductImageDto = {
            File: file,
            IsPrimary: images.length === 0 && fileIndex === 0,
          };

          const reader = new FileReader();
          reader.onloadend = () => {
            const previewUrl = reader.result as string;

            // Append safely using functional updates
            setImages((prev) => {
              const updated = [...prev, newImage];
              onImagesChange?.(updated);
              return updated;
            });

            setPreviews((prev) => [...prev, previewUrl]);
          };

          reader.readAsDataURL(file);
        }
      });

      e.target.value = "";
    },
    [images, onImagesChange]
  );

  const handleSetPrimary = useCallback(
    (index: number) => {
      const updatedImages = images.map((img, i) => ({
        ...img,
        IsPrimary: i === index,
      }));
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
    },
    [images, onImagesChange]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      const updatedImages = images.map((img, i) => {
        if (i === index) {
          return {
            ...img,
            IsDeletable: true,
            Path: img.Path,
          };
        }
        return img;
      });

      // If removed image was primary, set first non-deleted as primary
      if (images[index].IsPrimary) {
        const firstNonDeletedIndex = updatedImages.findIndex(
          (img) => !img.IsDeletable
        );
        if (firstNonDeletedIndex !== -1) {
          updatedImages[firstNonDeletedIndex].IsPrimary = true;
        }
      }

      setImages(updatedImages);
      onImagesChange?.(updatedImages);
    },
    [images, onImagesChange]
  );

  // Filter out deleted images for display
  const visibleImages = images.filter((_, i) => !images[i].IsDeletable);
  const visiblePreviews = previews.filter((_, i) => !images[i].IsDeletable);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <PhotoIcon className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition">
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </label>
      </div>

      {/* Image Preview Grid */}
      {visiblePreviews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visiblePreviews.map((preview, displayIndex) => {
            // Find the actual index in the full images array
            const actualIndex = images.findIndex(
              (_, i) =>
                !images[i].IsDeletable &&
                images.filter((_, j) => !images[j].IsDeletable && j < i)
                  .length === displayIndex
            );

            console.log(preview);
            return (
              <div
                key={actualIndex}
                className="relative group rounded-lg overflow-hidden bg-gray-100"
              >
                {/* Image */}
                <img
                  src={
                    preview.startsWith("Uploads")
                      ? SERVER_BASE_URL + preview
                      : preview
                  }
                  alt={`Product ${displayIndex + 1}`}
                  className="w-full h-40 object-cover"
                />

                {/* Primary Badge */}
                {images[actualIndex].IsPrimary && (
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Primary
                  </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  {!images[actualIndex].IsPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(actualIndex)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(actualIndex)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    title="Remove image"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {visiblePreviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {isUpdate
              ? "No images uploaded yet. Add images to showcase your product."
              : "No images selected. Upload images to get started."}
          </p>
        </div>
      )}

      {/* Image Count */}
      {visiblePreviews.length > 0 && (
        <p className="text-sm text-gray-600">
          {visiblePreviews.length} image
          {visiblePreviews.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
