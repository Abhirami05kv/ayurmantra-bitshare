"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartList } from "../_hooks/useCartList";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserApi } from "../api/userApi";
import { useToast } from "@/hooks/use-toast";
import AddressDialog from "../_components/AddressDialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GrFormClose } from "react-icons/gr";
import {
  createOrderService,
  createPaymentService,
  verifyPaymentService,
} from "../api/orderApi";
import Image from "next/image";
import { initializeRazorpay } from "../utils/razorpay";
import ContactDialog from "../_components/ContactDialog";
import { Input } from "@/components/ui/input";
import { redeemCouponService, removeCouponService } from "../api/couponApi";
import {
  redeemGiftcardService,
  removeGiftcardService,
} from "../api/giftCardApi";

interface AddressProps {
  id?: string | number;
  city: string;
  zipCode: string;
  street: string;
  state: string;
  country: string;
}

interface AddressPayload {
  city: string;
  zipCode: string;
  street: string;
  state: string;
  country: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface ApiError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
  error?: {
    message?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
}

interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}

declare const window: Window;

function Checkout() {
  const { data: cart } = useCartList();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [address, setAddress] = useState<AddressProps[]>([]);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [showGiftCardInput, setShowGiftCardInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [giftCardCode, setGiftCardCode] = useState("");
  useEffect(() => {
    setIsClient(true);
    const userData = Cookies.get("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);


  useEffect(() => {
    if (user?.address?.length) {
      setAddress([user.address[0]]);
    }
  }, [user?.address]);
  useEffect(() => {
    if (cart?.couponCode) {
      setAppliedCoupon(cart.couponCode);
    }
  }, [cart?.couponCode]);
  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  };

  // Calculate totals
  const subtotal = cart?.totalAmount || 0;
  const shipping = cart?.flatRate;

  // Mutation to update user address
  const editMutation = useMutation({
    mutationFn: (updatedAddress: AddressPayload) =>
      editUserApi(user.id, { address: [updatedAddress] }),
    onSuccess: (data) => {
      const updatedUser = { ...user, address: data.address };
      Cookies.set("user", JSON.stringify(updatedUser));

      setAddress(data.address);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Address Updated",
        description: "Your shipping address has been updated successfully.",
        variant: "default",
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Failed to Update Address",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });
  const redeemCouponMutation = useMutation({
    mutationFn: (couponCode: string) => redeemCouponService({ couponCode }),
    onSuccess: (data) => {
      toast({
        title: "Coupon Applied",
        description: data.message || "Coupon applied successfully!",
        variant: "default",
      });
      setAppliedCoupon(couponCode);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: ApiError) => {
      console.log(error);

      toast({
        title: "Coupon Error",
        description:
          error.response?.data?.message ||
          "Failed to apply coupon. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeCouponMutation = useMutation({
    mutationFn: () => removeCouponService(),
    onSuccess: (data) => {
      toast({
        title: "Coupon Removed",
        description: data.message || "Coupon removed successfully!",
        variant: "default",
      });
      setAppliedCoupon(null);
      setCouponCode("");

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to remove coupon. Please try again.",
        variant: "destructive",
      });
    },
  });

  const redeemGiftcardMutation = useMutation({
    mutationFn: (giftCardCode: string) =>
      redeemGiftcardService({ giftCardCode }),
    onSuccess: (data) => {
      toast({
        title: "Giftcard Applied",
        description: data.message || "Giftcard applied successfully!",
        variant: "default",
      });

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: ApiError) => {
      console.log(error);

      toast({
        title: "Giftcard Error",
        description:
          error.response?.data?.message ||
          "Failed to apply giftcard. Please try again.",
        variant: "destructive",
      });
    },
  });
  const removeGiftcardMutation = useMutation({
    mutationFn: (giftCardCode: string) =>
      removeGiftcardService({ giftCrdCode:giftCardCode }),
    onSuccess: (data) => {
      toast({
        title: "Giftcard Removed",
        description: data.message || "Giftcard removed successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: ApiError) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to remove giftcard. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRemoveGiftcard = () => {
    removeGiftcardMutation.mutate(cart?.giftCardCode);
  };
  const handleApplyGiftcard = () => {
    if (!giftCardCode.trim()) {
      toast({
        title: "Invalid Giftcard",
        description: "Please enter a giftcard code",
        variant: "destructive",
      });
      return;
    }
    redeemGiftcardMutation.mutate(giftCardCode);
  };
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }
    redeemCouponMutation.mutate(couponCode);
  };

  const handleRemoveCoupon = () => {
    removeCouponMutation.mutate();
  };

  // Handle saving the updated address
  const handleSaveAddress = (newAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => {
    editMutation.mutate(newAddress);
  };

  const handlePlaceOrder = async () => {
    try {
      // Load Razorpay script
      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        toast({
          title: "Error",
          description: "Failed to load Razorpay. Please try again.",
          variant: "destructive",
        });
        return;
      }

   
      const { id, ...shippingAddress } = address[0];
      console.log(id);

      const payload = {
        paymentMethod: "Online Payment",
        shippingAddress,
      };

      const order = await createOrderService(payload);

      if (!order || order.statusCode !== 201 || !order.orderId) {
        throw new Error("Invalid order response from server.");
      }

      // Create Razorpay Payment Order
      const res = await createPaymentService(String(order.orderId));

      if (!res || !res.data) {
        throw new Error("Failed to create payment order.");
      }

      const razorpayOrder = res.data;

      // Open Razorpay Payment Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: subtotal,
        currency: "INR",
        name: "Ayurmantra",
        description: "Payment for your order",
        order_id: razorpayOrder?.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          console.log("Razorpay Response:", response);

          if (!response.razorpay_payment_id) {
            throw new Error("Payment failed. No payment ID received.");
          }

          const result = await verifyPaymentService(response);

          if (result.data.statusCode === 200) {
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully.",
              variant: "default",
            });
            router.push("/shop");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phoneNumber || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          (error as ApiError)?.response?.data?.message ||
          "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/cart")}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Address Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user?.name || "N/A"}</p>
                      <p className="text-gray-500">{user?.email || "N/A"}</p>
                      <p className="text-gray-500">
                        {user?.phoneNumber || "N/A"}
                      </p>
                    </div>
                    {isClient && (
                      <ContactDialog initialValues={initialValues} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      {address && address?.length > 0 ? (
                        address?.map((addr: AddressProps) => (
                          <div key={addr?.id}>
                            <p className="font-medium">
                              {addr?.street || "---"}
                            </p>
                            <p className="text-gray-500">
                              {addr?.city || "---"}
                            </p>
                            <p className="text-gray-500">
                              {addr?.state || "---"}, {addr?.country || "---"},{" "}
                              {addr?.zipCode || "---"}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No address provided</p>
                      )}
                    </div>
                    {isClient && (
                      <AddressDialog
                        initialAddress={
                          address?.[0]
                            ? {
                                street: address[0].street,
                                city: address[0].city,
                                state: address[0].state,
                                zipCode: address[0].zipCode,
                                country: address[0].country,
                              }
                            : undefined
                        }
                        onSave={handleSaveAddress}
                        isLoading={editMutation.isPending}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CircleCheck className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Standard Shipping</p>
                        <p className="text-gray-500">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">${shipping}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  {cart?.data?.map((item: CartDataProps, index: number) => (
                    <div key={index} className="flex gap-4">
                      <Image
                        src={
                          item?.imageUrls
                            ? `${apiUrl}${item?.imageUrls}`
                            : "/dummy_product.jpg"
                        }
                        alt={item.name}
                        width={60}
                        height={60}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item?.name}</h3>
                          <span className="font-medium">
                            ${item?.price * item?.quantity }
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <Badge variant="secondary">
                            Qty: {item?.quantity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>${shipping}</span>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() =>
                          !appliedCoupon && setShowCouponInput(!showCouponInput)
                        }
                        className={`flex items-center text-blue-600 text-sm hover:underline ${
                          appliedCoupon ? "cursor-default" : "cursor-pointer"
                        }`}
                      >
                        {showCouponInput ? (
                          <ChevronUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        )}
                        {appliedCoupon
                          ? "Coupon Applied"
                          : "Have a coupon code?"}
                      </button>

                      {showCouponInput && (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Enter coupon code"
                            className="flex-1"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={
                              !!appliedCoupon || redeemCouponMutation.isPending
                            }
                          />
                          {appliedCoupon ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveCoupon}
                              disabled={removeCouponMutation.isPending}
                            >
                              {removeCouponMutation.isPending
                                ? "Removing..."
                                : "Remove"}
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleApplyCoupon}
                              disabled={redeemCouponMutation.isPending}
                            >
                              {redeemCouponMutation.isPending
                                ? "Applying..."
                                : "Apply"}
                            </Button>
                          )}
                        </div>
                      )}
                      {appliedCoupon && !showCouponInput && (
                        <div className="flex justify-between">
                          <div className="mt-2 text-sm text-green-600">
                            Coupon applied: {appliedCoupon}
                          </div>
                          <button
                            className="bg-white text-red-600"
                            onClick={handleRemoveCoupon}
                          >
                            <GrFormClose />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Gift Card Toggle & Input */}
                    {/* Gift Card Toggle & Input */}
                    <div className="py-2">
                      <button
                        onClick={() => setShowGiftCardInput(!showGiftCardInput)}
                        className="flex items-center text-blue-600 text-sm hover:underline"
                      >
                        {showGiftCardInput ? (
                          <ChevronUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mr-1" />
                        )}
                        Have a gift card?
                      </button>

                      {showGiftCardInput && (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Enter gift card code"
                            className="flex-1"
                            value={giftCardCode}
                            onChange={(e) => setGiftCardCode(e.target.value)}
                          />
                          {cart?.giftCardCode ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveGiftcard}
                              disabled={removeGiftcardMutation.isPending}
                            >
                              {removeGiftcardMutation.isPending
                                ? "Removing..."
                                : "Remove"}
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleApplyGiftcard}
                              disabled={redeemGiftcardMutation.isPending}
                            >
                              {redeemGiftcardMutation.isPending
                                ? "Applying..."
                                : "Apply"}
                            </Button>
                          )}
                        </div>
                      )}
                      {cart?.giftCardCode && !showGiftCardInput && (
                        <div className="flex justify-between">
                          <div className="mt-2 text-sm text-green-600">
                            Giftcard applied: {cart.giftCardCode}
                          </div>
                          <button
                            className="bg-white text-red-600"
                            onClick={handleRemoveGiftcard}
                          >
                            <GrFormClose />
                          </button>
                        </div>
                      )}
                    </div>

                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${cart?.grandTotal}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-green-700 hover:bg-green-600"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    By placing your order, you agree to our Terms of Service and
                    Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
