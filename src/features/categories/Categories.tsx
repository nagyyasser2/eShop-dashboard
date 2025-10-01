import React, { useState } from "react";
import { TagIcon } from "@heroicons/react/24/outline";
import CategoriesList from "./components/CategoriesList";
import CategoryFormModal from "./components/CategoryFormModal";

const Categories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="bg-white mx-auto rounded-lg p-6 border border-gray-200">
        <div className="flex gap-4 items-center text-lg font-semibold text-gray-700 mb-4">
          <TagIcon className="h-8 w-8 text-blue-600" />
          <div>
            <span>Category Management</span>
            <p className="text-sm text-gray-500">
              Manage your product categories here.
            </p>
          </div>
          <div className="ml-auto">
            <button
              onClick={openModal}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              + Add
            </button>
          </div>
        </div>
        <CategoriesList />
        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          categoryId={undefined}
        />
      </div>
    </div>
  );
};

export default Categories;
