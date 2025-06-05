"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';
import { useCartList } from '../_hooks/useCartList';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, RemoveCartService } from "../api/cartApi";
import { Loader } from '../_components/Loader';
import NoDataAvailable from '../_components/Nodata';
import Image from 'next/image';
import { AxiosError } from 'axios';
import CustomButton from '../_components/CustomButton';

function Cart() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch cart data
  const { data: cart, isLoading, isError, error } = useCartList();
  const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;
  const isUnauthorized =
    error instanceof Error &&
    "response" in error &&
    (error as AxiosError).response?.status === 401;

  // Mutation for adding items to cart
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: RemoveCartService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); 
    },
  });

  const handleRemoveQuantity = (cartItemId: number) => {
    removeMutation.mutate({ cartItem: cartItemId, quantity: 1 }); 
  };

  const handleRemoveItem = (cartItemId: number, quantity: number) => {
    removeMutation.mutate({ cartItem: cartItemId, quantity }); 
  };

  const handleAddQuantity = (productId: number) => {
    addMutation.mutate({ productId, quantity: 1 });
  };

  if (isError && !isUnauthorized) return <p>Failed to load cart</p>;

  // If the user is unauthorized, show a login prompt
  if (isUnauthorized) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <ShoppingBag className="w-6 h-6 text-gray-700 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-lg text-gray-700 mb-4">
                Please login to view your cart.
              </p>
              <CustomButton href='/login'> Login</CustomButton>
            
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If cart is empty, show no data available
  if (!cart || cart.data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <ShoppingBag className="w-6 h-6 text-gray-700 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <NoDataAvailable />
          <div className=' flex justify-center'>
            <CustomButton href='/shop'> Back to shop</CustomButton>
         </div>
        </div>
      </div>
    );
  }

  const subtotal = cart?.totalAmount || 0;
  const shipping =  cart?.flatRate || 0
  const total = subtotal + shipping;

  return (
    <Loader loading={isLoading}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <ShoppingBag className="w-6 h-6 text-gray-700 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="ml-2 text-gray-500">({cart?.total} items)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart?.data.map((item: CartDataProps) => (
                <Card key={item.id} className="overflow-hidden">
                 <CardContent className="p-4">
  <div className="flex gap-4">
    <div className="w-[50px] h-[50px] flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
      <Image
        src={item?.imageUrls ? `${apiUrl}${item.imageUrls}` : "/dummy_product.jpg"}
        alt={item?.name || "product"}
        width={50}
        height={50}
        className="object-cover"
        onError={(e) => {
          e.currentTarget.src = "/dummy_product.jpg"
          e.currentTarget.onerror = null; // Prevent infinite loop
        }}
      />
    </div>
    <div className="flex-1">
      {/* Rest of your content remains the same */}
      <div className="flex justify-between">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <button
          className="text-gray-400 hover:text-gray-500"
          onClick={() => handleRemoveItem(item.id, item.quantity)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleRemoveQuantity(item.id)} 
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center">{item?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleAddQuantity(item?.productId)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <p className="font-medium text-gray-900">
          ${(item?.price * item?.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  </div>
</CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-green-700 hover:bg-green-600" onClick={() => router.push("/checkout")}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
}

export default Cart;