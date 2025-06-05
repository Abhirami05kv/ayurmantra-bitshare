import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";
import Cookies from "js-cookie";
interface cartData  {
productId:number;
quantity:number
}
export const fetchCartService = async () => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.get(API_URL.cart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (cartData:cartData) => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.post(
      `${API_URL.cart}/add`,
      cartData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

export const RemoveCartService = async ({ cartItem, quantity }: { cartItem: number; quantity: number }) => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.delete(`${API_URL.cart}/remove/${cartItem}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { quantity }, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
