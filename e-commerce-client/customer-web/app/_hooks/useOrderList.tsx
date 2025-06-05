
import { useQuery } from '@tanstack/react-query';
import { fetchOrderService } from '../api/orderApi';


// Hook for fetching all categories
function useOrderList() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderService,
  });
}

export default useOrderList;