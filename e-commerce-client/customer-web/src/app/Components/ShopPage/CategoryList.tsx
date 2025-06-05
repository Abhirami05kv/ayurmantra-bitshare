const categories = [
  "Digital Gift Cards", "Face Cream", "Face Wash", "Herbal Tea",
  "Moisturizer", "Pain Balms", "Physical Gift Cards", "Shampoo",
  "Soap", "Supplements", "Thailam", "Toothpaste", "Uncategorized"
];

const CategoryList = () => {
  return (
    <ul className="space-y-1 text-gray-800">
      {categories.map((category, index) => (
        <li key={index} className="hover:underline cursor-pointer">{category}</li>
      ))}
    </ul>
  );
};

export default CategoryList;
