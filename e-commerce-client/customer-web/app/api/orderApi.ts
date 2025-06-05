import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";
import Cookies from "js-cookie";
interface AddressProps {
  street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }

  interface OrderPayloadProp {
    paymentMethod: string,
    shippingAddress:AddressProps,

  }

  interface VerifyProps {
    razorpay_order_id:string;
    razorpay_payment_id:string;
    razorpay_signature:string
  }
export const createOrderService = async (orderData: OrderPayloadProp) => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.post(`${API_URL.order}/create`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchOrderService = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) {
     
      return { orders: [] };
    }

    const response = await Axios.get(`${API_URL.order}/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
   
    console.error("Error fetching orders:", error);
    
  }
};
export const createPaymentService = async (id: string) => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.post(
      `${API_URL.payment}/create-payment`,
      { orderId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyPaymentService = async (paymentInfo: VerifyProps) => {
  try {
    const response = await Axios.post(`${API_URL.payment}/verify`, paymentInfo);
    return response;
  } catch (error) {
    throw error;
  }
};
