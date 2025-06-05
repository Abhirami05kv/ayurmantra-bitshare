import Axios from "../config/axiosConfig";
import { API_URL } from "../constants/API_URL";

export const fetchGiftcardsService = async ()=>{
    try {
      const response = await Axios.get(`${API_URL.giftcard}/all`) 
      return response.data 
    } catch (error) {
       throw error 
    }
}

export const createGiftCardService = async (giftcardData:any)=>{
  try {
    const response = await Axios.post(`${API_URL.giftcard}/create`,giftcardData)
    console.log(response);
    
    return response.data 
  } catch (error) {
    console.log(error);
    
    throw error 
  }
}

export const editGiftCardService = async (id:number,giftcardData:any)=>{
  try {

    
    const response = await Axios.put(`${API_URL.giftcard}/update/${id}`,giftcardData)
    console.log(response);
    
    return response.data 
  } catch (error) {
    console.log(error);
    
    throw error 
  }
}