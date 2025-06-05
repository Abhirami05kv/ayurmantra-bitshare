import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";


// export const fetchProductService = async () => {
//     try {
//       const response = await Axios.get(API_URL.product);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };


interface FetchProductsParams {
  priceOrder?: 'asc' | 'desc' | null;
  categoryId?: number | null | string;
  search?: string | null;
}

  

  export const fetchProductService = async (params: FetchProductsParams = {}) => {
    try {
      const response = await Axios.get(`${API_URL.product}`, {
        params, 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };