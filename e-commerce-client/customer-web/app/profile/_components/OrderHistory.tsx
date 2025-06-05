import React, { useState } from "react";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useOrderList from "@/app/_hooks/useOrderList";
import Image from "next/image";
import { getInvoiceService } from "@/app/api/invoiceApi";
import { useMutation } from "@tanstack/react-query";
import NoDataAvailable from "@/app/_components/Nodata";


interface Product {
  categoryId: number;
  description: string;
  id: number;
  imageUrls: string;
  name: string;
  price: string;
  status: string;
  stock: number;
 
}

interface OrderItem {
  id: number;
  price: string;
  product: Product;
  productId: number;
  quantity: number;
  totalPrice: string;
  name:string
}

interface Order {
  id: number;
  totalAmount: string;
  status: string;
  date: string;
  orderId:number;
  products: OrderItem[];
}

const OrderHistory = () => {
  const { data: orders } = useOrderList();
  const apiUrl = process.env.NEXT_PUBLIC_VITE_API_URL;
  const [downloadingOrderId, setDownloadingOrderId] = useState<number | null>(null);


  const invoiceMutation = useMutation({
    mutationFn: (orderId: number) => getInvoiceService(orderId),
    onSuccess: (data, orderId) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingOrderId(null);
    },
    onError: (error) => {
      console.error("Failed to download invoice:", error);
      setDownloadingOrderId(null);
    },
  });

  const handleDownloadInvoice = (orderId: number) => {
    setDownloadingOrderId(orderId);
    invoiceMutation.mutate(orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  if (!orders?.orders || orders.orders.length === 0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders?.orders.map((order: Order) => (
            <Card key={order?.orderId} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Order {order?.orderId}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{order?.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-semibold">
                      ${order?.totalAmount}
                    </p>
                    <Badge className={`${getStatusColor(order.status)}`}>
                      {order?.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order?.products?.map((item: OrderItem) => (
                    <div
                      key={item?.productId}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-start space-x-4 mb-2 sm:mb-0">
                        <div className="flex items-center justify-center">
                          <Image
                            src={
                              item?.product?.imageUrls
                                ? `${apiUrl}${item?.product?.imageUrls}`
                                : "/dummy_product.jpg"
                            }
                            alt="product"
                            height={60}
                            width={60}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item?.name}</h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">${item?.totalPrice}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto flex items-center justify-center"
                    onClick={() => handleDownloadInvoice(order.orderId)}
                    disabled={downloadingOrderId === order.orderId}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {downloadingOrderId === order.id ? "Downloading..." : "Download Invoice"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;