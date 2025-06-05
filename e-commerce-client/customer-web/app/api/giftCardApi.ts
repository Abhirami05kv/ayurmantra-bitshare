import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";
import Cookies from "js-cookie";
interface giftCardPayload {
  giftCardId: number;
  paymentMethod: string;
}
interface giftcardPayment {
  purchaseId:string
}
interface GiftcardProps {
  giftCardCode: string;
}
interface redeemCardPros {
  giftCrdCode:string
}
export const fetchGiftcardService = async () => {
  try {
    const response = await Axios.get(`${API_URL.gitcard}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const purchaseGiftcardService = async (payload: giftCardPayload) => {
  try {
    const token = Cookies.get("token");
    if (!token) return;
    const response = await Axios.post(`${API_URL.gitcard}/purchase`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    
    return response.data
  } catch (error) {
    throw error;
  }
};

export const giftcardPaymentService = async (purchaseId:giftcardPayment)=>{
try {
  const response = await Axios.post(`${API_URL.payment}/purchase-giftcard-payment`,purchaseId)

  
  return response.data
} catch (error) {
  throw error;
}
}

export const redeemGiftcardService = async (giftcard:GiftcardProps)=>{
  const token = Cookies.get("token");
  try {

    const response = await Axios.post(`${API_URL.cart}/apply-GiftCard`,giftcard,{
       
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const removeGiftcardService = async (giftcard: redeemCardPros) => {
  const token = Cookies.get("token");
  try {
    const response = await Axios.delete(`${API_URL.cart}/remove-GiftCard`, {
      data: giftcard, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};