import Axios from "../config/axiosConfig"
import { API_URL } from "../constants/API_URL"

export const dashBoardService = async()=>{
    try {
        const response = await Axios.get(`${API_URL.dashboard}`)
        return response.data
    } catch (error) {
        throw error
    }
}