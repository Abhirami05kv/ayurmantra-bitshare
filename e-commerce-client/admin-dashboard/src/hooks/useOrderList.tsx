// hooks/useOrderList.ts
import { useQuery } from "@tanstack/react-query"
import { fetchOrderService } from "../services/orderService"

function useOrderList(page: number, limit: number) {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => fetchOrderService(page, limit),
 
  })
}

export default useOrderList