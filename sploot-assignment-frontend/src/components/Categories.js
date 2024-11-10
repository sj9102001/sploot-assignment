import React, { useEffect, useState } from 'react';

const Categories = ({ onSelectCategory, categories }) => {

  return (
    <div className="flex overflow-x-auto overflow-y-hidden justify-center space-x-8 pt-4 border-t">
      {categories.map((category) => (
        <div
          key={category._id}
          onClick={() => onSelectCategory(category._id)}
          className="flex flex-col items-center space-y-1 text-gray-600 cursor-pointer hover:text-black hover:scale-105 transition-all"
        >
          <img src={category.imageUrl} className="h-8 w-8"/>
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;