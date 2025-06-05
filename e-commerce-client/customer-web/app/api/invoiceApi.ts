import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";

  export const getInvoiceService = async (id:number)=>{
    try {
 
        const response = await Axios.get(`${API_URL.order}/${id}/invoice`, {
          responseType: "arraybuffer", 
        })
   
        
        return response.data;
    } catch (error) {
        throw error;  
    }
  }