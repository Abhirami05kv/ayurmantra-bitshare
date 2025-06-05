import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";
import Cookies from "js-cookie";
interface couponProps {
  couponCode: string;
}
export const redeemCouponService = async (coupondetails: couponProps) => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.post(
      `${API_URL.cart}/apply-coupon`,
      coupondetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCouponService = async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.post(
        `${API_URL.cart}/remove-coupon`,
        {}, // Empty object as body if no data needed
        {  
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
