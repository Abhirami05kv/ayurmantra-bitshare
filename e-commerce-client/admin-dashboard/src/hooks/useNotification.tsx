
import { useQuery } from '@tanstack/react-query';
import { notificationService } from '../services/notificationService';




export  function useNotificationList (){
    return useQuery({
        queryKey:["notifications"],
        queryFn:notificationService
    })
}