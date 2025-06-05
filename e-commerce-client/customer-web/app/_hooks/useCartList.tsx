import { useQuery } from "@tanstack/react-query";
import { fetchCartService } from "../api/cartApi";


export const useCartList = () => {
  return useQuery({
    queryKey: ["cart"], 
    queryFn: fetchCartService,   
    staleTime: 0,  
    refetchOnMount: true,
   
  });
};
