import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { SERVER_BASE_URL } from "../../../../utils/constants";

interface ProductImage {
  id: number;
  url: string;
  altText?: string;
}

interface Product {
  images: ProductImage[];
}

interface ProductImageManagerProps {
  product: Product;
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  imageIdsToDelete: number[];
  setImageIdsToDelete: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProductImageManager: React.FC<ProductImageManagerProps> = ({
  product,
  selectedImages,
  setSelectedImages,
  imageIdsToDelete,
  setImageIdsToDelete,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeNewImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleImageDeletion = (imageId: number) => {
    setImageIdsToDelete((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Product Images</h3>

      <div>
        <label
          htmlFor="newImages"
          className="block text-sm font-medium text-gray-700"
        >
          Add New Images
        </label>
        <input
          id="newImages"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>

      {(selectedImages.length > 0 || product.images.length > 0) && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {product.images.map((image) => (
            <div key={image.id} className="relative">
              <img
                src={
                  image.url.startsWith("blob:")
                    ? image.url
                    : `${SERVER_BASE_URL + image.url}`
                }
                alt={image.altText || "Product image"}
                className="h-24 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => toggleImageDeletion(image.id)}
                className={`absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 ${
                  imageIdsToDelete.includes(image.id) ? "opacity-50" : ""
                }`}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          {selectedImages.map((image, index) => (
            <div key={`new-${index}`} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`New image ${index + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeNewImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageManager;
