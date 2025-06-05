import Axios from "../config/axiosConfig";
import { API_URL } from "../constants/API_URL";
type couponDetails ={
  coupon_code?:string;
  discount_type?:string;
  discount_value?:number|string;
  discount_percentage?:number|string;
  min_purchase?:number;
  usage_limit?:number;
  expiry_date?:string|null;
}


export const createCouponService = async (couponDetails: couponDetails) => {
  try {
    const response = await Axios.post(`${API_URL.coupon}/create`, couponDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponService = async () => {
  try {
    const response = await Axios.get(API_URL.coupon);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const editCouponService = async ({ id, couponDetails }: { id: number; couponDetails: any }) => {

  
  try {
    const response = await Axios.put(`${API_URL.coupon}/update/${id}`, couponDetails);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};