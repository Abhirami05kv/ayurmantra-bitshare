import Axios from "../config/axiosConfig";
import { API_URL } from "../constants/API_URL";
import Cookies from "js-cookie";

export const notificationService = async ()=>{
    const token = Cookies.get("adminToken");
    try {
        const response = await Axios.get(`${API_URL.notification}`,{
             
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const saveFcmTokenService = async (deviceToken:any)=>{
    const token = Cookies.get("adminToken");
    try {
        const response = await Axios.post(`${API_URL.users}/save-device-token`,deviceToken,{
             
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          
    })
    return response.data
    } catch (error) {
       throw error 
    }
}