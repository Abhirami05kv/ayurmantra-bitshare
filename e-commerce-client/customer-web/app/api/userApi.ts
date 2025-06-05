
import { API_URL } from "../_constants/API_URL";
import Axios from "../config/axiosConfig";

interface resetDetails{
  email:string;
  newPassword:string;
  confirmPassword:string;
}
type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};
type EditProps= {
  address?: Address[];
  name?:string;
  email?:string;
  phoneNumber?:string|number;
}
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string|number;



};
type LoginFormData = {
  email: string;
  password: string;
};

export const createUserService = async (userData: RegisterFormData) => {
  try {
    const response = await Axios.post(`${API_URL.register}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (loginDetails: LoginFormData) => {
  try {
    const response = await Axios.post(`${API_URL.login}`, loginDetails);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};


export const editUserApi = async (id:string,userDetails:EditProps)=>{
  try {
    const response = await Axios.put(`${API_URL.users}/${id}`,userDetails)
    return response.data;
  } catch (error) {
    throw error
  }
}


export const resetPasswordService = async (resetinfo:resetDetails)=>{
  try {
    const response = await Axios.post(`${API_URL.forgotPassword}`,resetinfo)
    return response.data;
  } catch (error) {
    throw error
  }
}