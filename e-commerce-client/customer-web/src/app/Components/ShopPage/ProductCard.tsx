import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Product {
  image: string;
  name: string;
  price: string;
}

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});

    const handleAddToCart = (product: Product, index: number) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setAddedToCart((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const isPhysical = product.name.toLowerCase().includes("physical");
        
      return(  
        <div
          key={index}
          className="group bg-white rounded-xl shadow-md overflow-hidden text-center p-4 relative"
        >
          <div className="w-full h-48 relative mb-4 cursor-pointer overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            {/* Hover Overlay */}
            <div
              className="absolute flex items-end justify-center inset-0 opacity-0 translate-y-4 z-10
            group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
            >
             <div style={{ fontFamily: "'Onest', sans-serif" }} className="flex flex-col gap-1 bg-white/80 backdrop-blur-sm p-2 rounded-md mb-3">
                {isPhysical ? (
                <>
                  {addedToCart[index] ? (
                  <button
                    onClick={() => router.push("/cart")}
                    className="bg-green-200 text-sm px-4 py-1 rounded hover:bg-green-400 font-medium z-20">
                    View Cart
                  </button>
                  ) :(
                   <button
                          onClick={() => handleAddToCart(product, index)}
                          //   setAddedToCart((prev) => ({
                          //     ...prev,
                          //     [index]: true,
                          //   }))
                          // }
                          className="bg-green-200 text-sm px-4 py-1 rounded hover:bg-green-400 font-medium z-20"
                        >
                          Add to Cart
                        </button>
                      )} 
                  <button className="bg-[#7FB53D] text-sm text-white px-4 py-1 rounded hover:bg-green-600 font-medium z-20">
                    Quick View
                  </button>
                </> 
                ) :(
                  <>
                  <button className="bg-green-200 text-sm px-4 py-1 rounded hover:bg-green-400 font-medium z-20">
                    Buy Now
                  </button>
                  <button className="bg-[#7FB53D] text-sm text-white px-4 py-1 rounded hover:bg-green-600 font-medium z-20">
                    Quick View
                  </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="text-orange-500 font-medium text-base mt-1">
            {product.price}
          </p>
        </div>
      )
      })}
    </div>
  );
};

export default ProductCard;
