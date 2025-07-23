import React, { useState } from "react";
import CategoriesList from "./components/CategoriesList";
import CategoryFormModal from "./components/CategoryFormModal";
import CategoriesHeader from "./components/CategoriesHeader";

const Categories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <CategoriesHeader />
        <CategoriesList openModal={openModal} />
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
