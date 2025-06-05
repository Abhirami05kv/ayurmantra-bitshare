import { useQuery } from "@tanstack/react-query";
import { fetchGiftcardService } from "../api/giftCardApi";


export const useGiftcardList = () => {
  return useQuery({
    queryKey: ["giftcard"], 
    queryFn: fetchGiftcardService,   
    staleTime: 0,  
   
  });
};
