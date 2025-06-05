import Axios from "../config/axiosConfig";
import { API_URL } from "../constants/API_URL";


export const createCategoryService = async (categoryData: { name: string, description: string ,status:string}) => {
    try {
      const response = await Axios.post(`${API_URL.category}/create`,categoryData)
      return response.data
    } catch (error) {
      throw error
    }
  };

  export const fetchCategoryService = async (page: number, limit: number, paginate: boolean = true) => {
    try {
      const url = paginate
        ? `${API_URL.category}?page=${page}&limit=${limit}`
        : `${API_URL.category}?paginate=false`;
      const response = await Axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const editCategoryService = async (id:string,categoryData:any)=>{
  try {
    const response = await Axios.put(`${API_URL.category}/${id}`,categoryData)
    return response.data
  } catch (error) {
    console.log(error);
    
    throw error
  }
}