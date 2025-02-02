// src/components/MobileFilterButton.js
import React from 'react';
import { FaFilter } from "react-icons/fa6";
const MobileFilterButton = ({ openFilters }) => {
  return (
    <button
      className="lg:hidden fixed bottom-4 right-4  text-indigo-500 text-2xl p-4 rounded-full font-bolder  transition-colors"
      onClick={openFilters}
    >
      <FaFilter />
    </button>
  );
};

export default MobileFilterButton;
