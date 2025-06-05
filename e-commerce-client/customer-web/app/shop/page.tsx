"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import CategoryList from "../_components/CategoryList";
import { Button } from "@/components/ui/button";
import { QuickView } from "../_components/QuickView";
import useProductList from "../_hooks/useProductList";
import Image from "next/image";
import AuthDialog from "../_components/auth/AuthDialog";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api/cartApi";

import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGiftcardList } from "../_hooks/useGiftcardList";
import { useRouter } from "next/navigation";
import GiftCardSection from "./_components/giftcardSection";


interface ApiError extends Error {
  response?: {
    data?: {
      message: string;
    };
    status?: number;
  };
}

function Shop() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataProps | null>(null);
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;
const queryClient =useQueryClient()
  // Fetch products
  const {
    data: productResponse,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useProductList({
    categoryId: selectedCategory?.name === "Digital Giftcard" ? null : (selectedCategory?.id || null),
    priceOrder: priceOrder,
    search: null,
  });

  // Fetch gift cards
  const {
    data: giftcardResponse,
    isLoading: isGiftcardLoading,
    isError: isGiftcardError,
    error: giftcardError,
  } = useGiftcardList();

  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Added to Cart",
        description: "The product has been added to your cart.",
        variant: "default",
      });
    },
    onError: (error: ApiError) => {
      if (error.response?.status === 401) {
        setShowAuthDialog(true);
      }
      toast({
        title: "Failed to Add to Cart",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddQuantity = (productId: number) => {
    addMutation.mutate({ productId, quantity: 1 });
  };

  // Handle price order change
  const handlePriceOrderChange = (value: string) => {
    if (value === "low-to-high") {
      setPriceOrder("asc");
    } else if (value === "high-to-low") {
      setPriceOrder("desc");
    } else {
      setPriceOrder(null);
    }
  };

  if (isProductLoading || isGiftcardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isProductError || isGiftcardError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {productError?.message || giftcardError?.message}
      </div>
    );
  }

  const products = productResponse?.data || [];
  const giftcards = giftcardResponse?.data || [];

  // Check if the selected category is not "Digital Giftcard"
  const isNonGiftcardCategorySelected =
    selectedCategory && selectedCategory.name !== "Digital Giftcard";

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <CategoryList setSelectedCategory={setSelectedCategory} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Gift Cards Section */}
            {!isNonGiftcardCategorySelected && giftcards?.length > 0 && (
              <GiftCardSection giftcards={giftcards} />
            )}

            {/* Show products only if a category is selected */}
            {!(selectedCategory?.name === "Digital Giftcard") && (
              <>
                <div className="flex justify-between items-center mb-8">
              
                  <h2 className="text-xl mb-4 text-[#0f8f3e]">Shop</h2>
                  <Select onValueChange={handlePriceOrderChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-to-high">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="high-to-low">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src="/no-data.png"
                      alt="No products found"
                      width={400}
                      height={400}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product: ProductDataProps) => (
                      <div
                        key={product.id}
                        className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        {/* Wishlist Icon */}
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition z-10">
                          <FaHeart className="text-lg" />
                        </button>

                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={
                              product?.imageUrls
                                ? `${apiUrl}${product?.imageUrls}`
                                : "/dummy_product.jpg"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            width={500}
                            height={500}
                          />

                          {/* Quick View Button */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-black/50 w-full h-full absolute" />
                            <QuickView product={product} />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-4">
                          <div className="text-xs text-gray-500 mb-1">
                            {product?.category}
                          </div>
                          <h2 className="font-medium text-gray-900 mb-1 hover:text-green-700 transition capitalize">
                            {product?.name}
                          </h2>
                          <p className="text-lg font-semibold text-gray-900">
                            ${product?.price}
                          </p>

                          {/* Add to Cart Button */}
                          <Button
                            variant="outline"
                            className={`w-full mt-3 ${
                              product.stock === 0
                                ? "bg-gray-300 text-gray-900 cursor-not-allowed"
                                : " bg-[#0f8f3e] hover:bg-[#0f8f3edd] hover:text-white text-white"
                            }`}
                            onClick={() => {
                              const token = Cookies.get("token");
                              const user = Cookies.get("user");
                              if (!token || !user) {
                                router.push("/login");
                              } else {
                                handleAddQuantity(product.id);
                              }
                            }}
                            disabled={product.stock === 0} // Disable the button if stock is 0
                          >
                            {product.stock === 0 ? (
                              "Out of Stock"
                            ) : (
                              <>
                                <FaShoppingCart className="mr-2" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* AuthDialog */}
      {showAuthDialog && (
        <AuthDialog onCloseDialog={() => setShowAuthDialog(false)} />
      )}
    </div>
  );
}

export default Shop;