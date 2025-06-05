import { useQuery } from "@tanstack/react-query";
import { getSingleOrderService } from "../services/orderService";

//hook for fetching  order
function useSingleOrderList(id:string) {
  return useQuery({
    queryKey: ["order", id], 
    queryFn: () => getSingleOrderService(id),
  })
}

export default useSingleOrderList