import PriceSlider from "./PriceSlider";
import CategoryList from "./CategoryList";


const FilterSidebar = () => {
  return (
    <div  style={{ fontFamily: "'Onest', sans-serif" }} className=" w-full md:w-64 space-y-8 bg-[#EAF4D3]  mb-4 rounded-2xl h-[120vh] p-4 shadow-md">
      <div>
        <h2 className="text-xl font-medium mb-2">Filter by price</h2>
        <PriceSlider />
      </div>
      <div>
        <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-xl font-medium mb-2">Product categories</h2>
        <CategoryList />
      </div>
    </div>
  );
};

export default FilterSidebar;