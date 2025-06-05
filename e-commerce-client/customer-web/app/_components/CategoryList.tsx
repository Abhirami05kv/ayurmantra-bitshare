"use client";
import React from 'react';
import useCategoryList from '../_hooks/useCategoryList';
import { ChevronRight } from 'lucide-react';


interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  status: string;
  imageUrls: string;
  categoryId: number;
}

interface CategoryDataProps {
  id: string;
  name: string;
  categoryCount: number;
  isactive: boolean;
  description: string;
  products: Product[];
  status: string;
}

interface CategoryListProps {
  setSelectedCategory: (category: CategoryDataProps | null) => void;
}

function CategoryList({ setSelectedCategory }: CategoryListProps) {
  const { data: categories, isLoading, isError } = useCategoryList();

  if (isLoading) {
    return (
      <aside className="w-64 p-4 rounded-xl bg-white">
        <div className="h-6 w-24 bg-gray-100 rounded mb-4 animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="h-10 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className="w-64 p-4 rounded-xl bg-white">
        <div className="text-sm text-red-500">
          Unable to load categories. Please try again later.
        </div>
      </aside>
    );
  }


  const updatedCategories = [
    {
      id: "digital-giftcard",
      name: "Digital Giftcard",
      categoryCount: 0,
      isactive: true,
      description: "Digital gift cards for various services.",
      products: [],
      status: "active",
    },
    ...(categories?.data || []), 
  ];

  return (
    <aside className="w-64 bg-white rounded-xl shadow-lg">
      <h2 className="px-4 pt-4 text-md  font-semibold text-[#0f8f3e] uppercase tracking-wide">
        Categories
      </h2>
    <div className='w-full border-b-2 mt-2'></div>

      <ul className="mt-3 p-2">
        {updatedCategories.map((category: CategoryDataProps) => (
          <li 
            key={category.id} 
            className="group flex items-center justify-between px-3 py-2.5 rounded-lg
                       text-gray-700 hover:bg-gray-50 cursor-pointer
                       transition-all duration-200"
            onClick={() => setSelectedCategory(category)}
          >
            <span className="text-sm font-medium capitalize">
              {category.name}
            </span>
            <ChevronRight 
              size={16} 
              className="text-gray-400 transform group-hover:translate-x-0.5 
                         transition-transform duration-200"
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryList;