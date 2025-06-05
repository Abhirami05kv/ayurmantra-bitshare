"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronUpIcon,ChevronDownIcon,TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface Product {
  image: string;
  name: string;
  price: string;
  quantity?:number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(
      (item:Product)=>({
        ...item,
        quantity: item.quantity ?? 1,
      })
    );
    setCartItems(storedCart);
  }, []);

   const updateCart = (updatedItems: Product[]) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const incrementQuantity = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity! += 1;
    updateCart(updated);
  };

  const decrementQuantity = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity! > 1) {
      updated[index].quantity! -= 1;
      updateCart(updated);
    }
  };

  const deleteItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    updateCart(updated);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("£", ""));
    return acc + price;
  }, 0);

  return (
    <div className=" bg-[#DEEED9] min-h-[680px] px-5">
      <h2 style={{ fontFamily: "Libre Baskerville" }}
        className="text-[#7FB53D] italic text-2xl font-medium px-5 mb-10 pt-8">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ fontFamily: "Libre Baskerville" }} className="text-red-400 text-lg text-center">Your cart is empty!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                </div>

                {/* Right side: quantity box + price + delete icon */}
                <div className="flex items-center gap-4">
                    <div className=" bg-[#7FB53D] cursor-pointer hover:bg-green-100 hover:text-[#7FB53D] text-white rounded px-1 py-0.5 flex items-center shadow-sm space-x-1 w-fit h-fit">
                        <button
                            onClick={() => incrementQuantity(index)}
                            className="text-gray-600 p-1 hover:text-green-600"
                            >
                            <ChevronUpIcon className="h-4 w-4 cursor-pointer" />
                        </button>
                        <span className="text-sm font-medium">
                        {item.quantity ?? 1}
                        </span>
                        <button
                            onClick={() => decrementQuantity(index)}
                            className="text-gray-600 p-1 hover:text-red-500"
                            >
                            <ChevronDownIcon className="h-4 w-4 cursor-pointer" />
                        </button>
                    </div>
                    <div className="text-sm font-semibold min-w-[60px] text-right">
                        £{(parseFloat(item.price.replace("£", "")) * (item.quantity ?? 1)).toFixed(2)}
                    </div>
                    
                    {/* Delete icon */}
                    <button
                        onClick={() => deleteItem(index)}
                        className="text-red-400 hover:text-red-500 cursor-pointer"
                        title="Remove item"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            ))}

            {/* Coupon input below cart products */}
            <div className="border border-dashed w-1/2 border-gray-400 rounded-md p-4 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L15 12 9.75 7"
                    />
                    </svg>
                    <input
                    type="text"
                    placeholder="Coupon code"
                    className="border-none outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
                    />
                </div>
                <button className="text-sm font-medium text-white bg-[#7FB53D] px-4 py-1 rounded hover:bg-green-100 
                hover:text-[#7FB53D] transition cursor-pointer">
                    Apply
                </button>
            </div>

        </div>
        <div className="p-6 rounded-br-[60px] shadow-lg border self-start">
            <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-medium mb-4">Cart Totals</h3>
            <div className="flex justify-between mb-2">
              <span style={{ fontFamily: "'Onest', sans-serif" }}>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span style={{ fontFamily: "'Onest', sans-serif" }}>Shipping</span>
              <span style={{ fontFamily: "'Onest', sans-serif" }}>Free shipping</span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t pt-4 mt-4">
              <span style={{ fontFamily: "'Onest', sans-serif" }}>Total</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <button 
            onClick={() => router.push("/checkout")}
            className="w-full bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] 
            cursor-pointer text-white px-6 py-2 rounded-full font-medium transition mt-3">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
