
import { useQuery } from '@tanstack/react-query';
import { fetchGiftcardsService } from '../services/giftcardservice';



export  function useGiftcardList (){
    return useQuery({
        queryKey:["giftcards"],
        queryFn:fetchGiftcardsService
    })
}