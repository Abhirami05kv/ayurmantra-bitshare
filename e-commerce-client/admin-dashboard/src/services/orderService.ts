import Axios from "../config/axiosConfig"
import { API_URL } from "../constants/API_URL"

export const fetchOrderService = async (page: number, limit: number) => {
    try {
        const response = await Axios.get(`${API_URL.order}?page=${page}&limit=${limit}`)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}
export const getSingleOrderService = async (id:string)=>{
    try {
        const response = await Axios.get(`${API_URL.order}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const updateOrderStatusService = async (id:string,status:string)=>{
    console.log(status);
    try {
        const response = await Axios.put(`${API_URL.order}/${id}/status`,{status})
       
        
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}