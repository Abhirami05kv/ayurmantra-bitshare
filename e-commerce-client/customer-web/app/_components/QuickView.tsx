"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { addToCart } from "../api/cartApi";
import { AxiosError } from "axios";

const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

interface BaseItem {
  id: number;
  title?: string;
  name?: string;
  description?: string | null;
  image?: string;
  imageUrls?: string;
  price?: number;
  usableAmount?: string;
  stock?: number;
  category?: string;
}

interface QuickViewProps {
  product: BaseItem;
}

export function QuickView({ product }: QuickViewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;
const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Added to Cart",
        description: "The product has been added to your cart.",
        variant: "default",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
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

  const imageUrl = product.image
    ? `${apiUrl}${product.image}`
    : product.imageUrls
    ? `${apiUrl}${product.imageUrls}`
    : "/dummy_product.jpg";

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute inset-x-0 bottom-0 bg-black/70 text-white py-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 hover:bg-black/80">
          <Eye className="w-4 h-4" />
          <span>Quick View</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl md:max-w-3xl p-0 bg-white">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-[400px] rounded-l-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.title || product.name || "product"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="p-6 space-y-6">
            <DialogHeader>
              <div className="space-y-2">
                {product?.category && (
                  <Badge variant="secondary" className="mb-2">
                    {product?.category}
                  </Badge>
                )}
                <DialogTitle className="text-2xl font-bold tracking-tight capitalize">
                  {product?.title || product?.name}
                </DialogTitle>
                <DialogDescription className="text-xl font-semibold text-blue-600">
                  ${product?.price || product?.usableAmount}
                </DialogDescription>
              </div>
            </DialogHeader>

            <Separator />

            <div className="space-y-4">
              <p className="text-sm/relaxed text-muted-foreground">
                {product?.description || "No description available."}
              </p>

              {product.stock !== undefined && (
                <div className="text-sm text-muted-foreground">
                  Stock: {product?.stock} units
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button
                className="flex-1 h-11"
                size="lg"
                onClick={() => handleAddQuantity(product.id)}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={classNames(
                  "h-11 w-11",
                  isLiked && "text-red-500 hover:text-red-600"
                )}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isLiked ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default QuickView;