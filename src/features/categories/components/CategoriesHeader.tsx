import { TagIcon } from "@heroicons/react/24/outline";

const CategoriesHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <TagIcon className="h-8 w-8 text-teal-600" />
      <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
    </div>
  );
};

export default CategoriesHeader;
