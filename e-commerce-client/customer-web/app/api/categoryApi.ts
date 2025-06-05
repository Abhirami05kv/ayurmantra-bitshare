import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";


export const fetchCategoryService = async ()=>{
    try {
     const response = await Axios.get(`${API_URL.category}?paginate=false`) 
    
     
     return response.data
    } catch (error) {
      throw error;
    }
  }