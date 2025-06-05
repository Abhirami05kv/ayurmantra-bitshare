
import { useQuery } from '@tanstack/react-query';
import { dashBoardService } from '../services/dashboardService';



export  function useDashBoardList (){
    return useQuery({
        queryKey:["dashboard"],
        queryFn:dashBoardService
    })
}