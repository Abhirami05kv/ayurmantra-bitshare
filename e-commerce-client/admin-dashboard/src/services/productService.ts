import Axios from "../config/axiosConfig";
import { API_URL } from "../constants/API_URL";

export const createProductService = async (productData: any) => {
  try {
    const response = await Axios.post(`${API_URL.product}/create`, productData);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

export const fetchProductService = async () => {
  try {
    const response = await Axios.get(API_URL.product);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const editProductService = async (id:string,productData:any)=>{
  try {
    const response = await Axios.put(`${API_URL.product}/update/${id}`,productData)
  
    
    return response.data
  } catch (error) {
    console.log(error);
    
    throw error;
  }
}
