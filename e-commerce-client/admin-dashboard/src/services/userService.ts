
import Axios from "../config/axiosConfig";
import { API_URL } from "../constants/API_URL";

export const getUserService = async () => {
  try {
    const response = await Axios.get(API_URL.users);
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (userData: any) => {
  try {
    const response = await Axios.post(`${API_URL.register}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUserService = async (id: string, userData: any) => {
  try {
    const response = await Axios.put(`${API_URL.users}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const loginService = async (loginDetails: any) => {
  try {
    const response = await Axios.post(`${API_URL.login}`, loginDetails);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
