'use client';
import { useState } from 'react';
import React from 'react'
import FilterSidebar from '../Components/ShopPage/FilterSideBar'
import ProductCard from '../Components/ShopPage/ProductCard'
import { useRouter } from 'next/navigation';

const products = [
  { image: '/images/bronzecardd.png', name: 'Bronze Gift Card', price: '£48.00' },
  { image: '/images/bronzecardd.png', name: 'Bronze Gift Card', price: '£48.00' },
  { image: '/images/bronzecardd.png', name: 'Gold Gift Card', price: '£108.00' },
  { image: '/images/bronzecardd.png', name: 'Platinum Gift Card', price: '£144.00' },
  { image: '/images/bronzecardd.png', name: 'Silver Gift Card', price: '£72.00' },
  { image: '/images/bronzecardd.png', name: 'Ruby Gift Card', price: '£200.00' },
  { image: '/images/bronzecardd.png', name: 'Emerald Gift Card', price: '£150.00' },
  { image: '/images/bronzecardd.png', name: 'Pearl Gift Card', price: '£90.00' },
  { image: '/images/bronzecard.png', name: 'Bronze physical Gift Card', price: '£48.00' },
  { image: '/images/bronzecard.png', name: 'Bronze physical Gift Card', price: '£48.00' },
  { image: '/images/bronzecard.png', name: 'Gold physical Gift Card', price: '£108.00' },
  { image: '/images/bronzecard.png', name: 'Platinum physical Gift Card', price: '£144.00' },
  { image: '/images/bronzecard.png', name: 'Silver physical Gift Card', price: '£72.00' },
  { image: '/images/bronzecard.png', name: 'Ruby physical Gift Card', price: '£200.00' },
  { image: '/images/bronzecard.png', name: 'Emerald physical Gift Card', price: '£150.00' },
  { image: '/images/bronzecard.png', name: 'Pearl physical Gift Card', price: '£90.00' },
];

const ITEMS_PER_PAGE = 8;

export default function Shop () {
  const [page, setPage] = useState(1);
  const router = useRouter();


  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
      <aside className="md:w-1/4 w-full">
        <FilterSidebar />
      </aside>
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium">Shop</h1>
          
          <div className="flex gap-4">
              <button
                onClick={() => router.push("/cart")}
                style={{ fontFamily: "'Onest', sans-serif" }}
                className="bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] text-white px-6 py-2 font-medium transition cursor-pointer"
              >
                My Cart
              </button>

            <select style={{ fontFamily: "'Onest', sans-serif" }}
              className="bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer 
              text-white px-6 py-2 font-medium transition"
              defaultValue="default"
              // You can later add sorting logic using this value
            >
              <option value="default">Default sorting</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="nameAsc">Sort by: Popularity</option>
              <option value="nameDesc">Sort by: Latest</option>
            </select>
          </div>
        </div>
        
        <ProductCard products={paginatedProducts} />
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 ">
          <p className="text-gray-600 mb-4 sm:mb-0">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of {products.length} results
          </p>
          <div className="flex space-x-4">
            <button
              style={{ fontFamily: "'Onest', sans-serif" }}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <span className="font-semibold">Page {page} of {totalPages}</span>
            <button
              style={{ fontFamily: "'Onest', sans-serif" }}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

