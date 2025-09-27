import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function EditProductPageHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        Edit Product
      </h1>
    </div>
  );
}

export default EditProductPageHeader;
