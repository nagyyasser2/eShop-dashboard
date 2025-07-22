import { TagIcon } from "@heroicons/react/24/outline";

const CategoriesHeader = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <TagIcon className="h-8 w-8 text-teal-600" />
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
      </div>
      <button
        onClick={openModal}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
      >
        New +
      </button>
    </div>
  );
};

export default CategoriesHeader;
