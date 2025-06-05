import Image from 'next/image';
import React from 'react';

function PriceList() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ayur Manthra Price List</h2>
        
        <div className="space-y-4">
          <Image 
            src="/AYURMANTHRA-PRICE-LIST_page-0001-2-1.jpg" 
            alt="Ayur Manthra Price List Page 1" 
            width={700} 
            height={900} 
            className="rounded-lg shadow-md" 
          />
          <Image 
            src="/AYURMANTHRA-PRICE-LIST_page-0002-1.jpg" 
            alt="Ayur Manthra Price List Page 2" 
            width={700} 
            height={900} 
            className="rounded-lg shadow-md" 
          />
        </div>
        
        <p className="mt-6 text-gray-600 leading-relaxed text-justify">
          At <span className="font-semibold text-gray-800">Ayur Manthra</span>, we offer holistic wellness through authentic Ayurvedic treatments
          tailored to your unique needs. Our comprehensive range of therapies is designed to restore balance,
          rejuvenate the body, and promote overall well-being.
        </p>
        
        <p className="mt-4 text-gray-600 text-justify">
          Explore our detailed price list for specialized treatments and wellness packages.
          We are committed to providing transparent pricing and exceptional care, ensuring
          your journey to health and harmony is accessible and affordable.
        </p>
      </div>
    </div>
  );
}

export default PriceList;
