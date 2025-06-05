
import { useQuery } from '@tanstack/react-query';
import { getCouponService } from '../services/couponService';


//hook for fetching all coupon
function useCouponList() {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getCouponService,
  });
  
}

export default useCouponList