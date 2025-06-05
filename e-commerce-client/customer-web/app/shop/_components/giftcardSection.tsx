"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  giftcardPaymentService,
  purchaseGiftcardService,
} from "@/app/api/giftCardApi";
import Cookies from "js-cookie";
import { initializeRazorpay } from "@/app/utils/razorpay";
import { verifyPaymentService } from "@/app/api/orderApi";
import QuickView from "@/app/_components/QuickView";

const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface GiftCard {
  id: number;
  title: string;
  description: string | null;
  image: string;
  usableAmount: string;
  purchaseAmount:string|number
}

interface ApiError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

interface GiftCardSectionProps {
  giftcards: GiftCard[];
}

export default function GiftCardSection({ giftcards }: GiftCardSectionProps) {
  const { toast } = useToast();
  const router = useRouter();
  const token = Cookies.get("token");
  const user = Cookies.get("user");

  const giftcardPurchaseMutation = useMutation({
    mutationFn: purchaseGiftcardService,
    onSuccess: async (data) => {
      await handlePayment(String(data?.purchaseId));
    },
    onError: (error: ApiError) => {
      toast({
        title: "Failed to Purchase Gift Card",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePurchaseGiftcard = (giftCardId: number) => {
    if (!token || !user) {
      router.push("/login");
    } else {
      giftcardPurchaseMutation.mutate({
        giftCardId: giftCardId,
        paymentMethod: "razorpay",
      });
    }
  };

  const handlePayment = async (purchaseId: string) => {
    try {
      const paymentResponse = await giftcardPaymentService({ purchaseId });

      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        toast({
          title: "Error",
          description: "Failed to load Razorpay. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: paymentResponse.amount,
        currency: paymentResponse.currency || "INR",
        name: "Ayurmantra",
        description: "Payment for your gift card",
        order_id: paymentResponse.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          if (!response.razorpay_payment_id) {
            throw new Error("Payment failed. No payment ID received.");
          }

          const result = await verifyPaymentService(response);
          if (result.status === 201) {
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully.",
              variant: "default",
            });
            router.push("/shop");
          }
        },
        prefill: {
          name: user ? JSON.parse(user).name : "",
          email: user ? JSON.parse(user).email : "",
          contact: user ? JSON.parse(user).phone : "",
        },
        theme: {
          color: "#F37254",
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing your payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl mb-4 text-[#0f8f3e]">Gift Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {giftcards.map((giftcard) => (
          <div
            key={giftcard.id}
            className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={
                  giftcard?.image && giftcard.image.trim() !== ""
                    ? `${apiUrl}${giftcard.image}`
                    : "/dummy_product.jpg"
                }
                alt={giftcard?.title || "Gift Card"}
                className=" group-hover:scale-105 transition-transform duration-500 object-fill"
                fill
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 w-full h-full absolute" />
                <QuickView product={giftcard} />
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-medium text-gray-900 mb-1 hover:text-green-700 transition capitalize">
                {giftcard?.title}
              </h2>
              <p className="text-lg font-semibold text-gray-900">
                ${giftcard?.purchaseAmount}
              </p>
              <Button
                variant="outline"
                className="w-full mt-3 bg-[#0f8f3e] hover:bg-[#0f8f3edd] hover:text-white text-white border-none"
                onClick={() => handlePurchaseGiftcard(giftcard.id)}
              >
                <FaShoppingCart className="mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
