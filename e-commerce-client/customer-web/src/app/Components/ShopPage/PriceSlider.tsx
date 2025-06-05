"use client";
import { useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
};

const items: Item[] = [
  { id: 1, name: 'Item A', price: 30 },
  { id: 2, name: 'Item B', price: 70 },
  { id: 3, name: 'Item C', price: 120 },
  { id: 4, name: 'Item D', price: 200 },
  { id: 5, name: 'Item E', price: 50 },
];

const PriceSlider = () => {
  const [price,setPrice]=useState<number>(240)
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

    const handleFilter = () => {
    const result = items.filter(item => item.price >= 1 && item.price <= price);
    setFilteredItems(result);
  };

  return (
    <>
    <div className="space-y-2">
      <input 
      type="range" 
      min="0" 
      max="240"
      value={price}
      onChange={handleChange} 
      className="w-full accent-[#7FB53D]" />
      <button onClick={handleFilter}
      className="bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer 
      text-white px-6 py-2 rounded-full font-medium transition">Filter</button>
      <p className="text-sm text-gray-600">Price: £0 — £{price}</p>
    </div>
      
      {/* Filtered Items Display*/ }
      <div className="space-y-2">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500 text-sm">No items found.</p>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="p-2 border rounded-md shadow-sm">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">£{item.price}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PriceSlider;
