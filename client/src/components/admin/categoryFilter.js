import React from 'react';
import { Button } from 'antd';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-buttons flex gap-2 mb-3">
      {categories.map((category) => (
        <Button
          key={category}
          type={category === selectedCategory ? 'primary' : 'default'}
          onClick={() => onSelectCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
