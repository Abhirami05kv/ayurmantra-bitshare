
import { useQuery } from "@tanstack/react-query";
import { fetchProductService } from "../api/productApi";

interface FetchProductsParams {
  priceOrder?: 'asc' | 'desc' | null;
  categoryId?: number | null | string;
  search?: string | null;
}

function useProductList(params: FetchProductsParams = {}) {
  return useQuery({
    queryKey: ["products", params], 
    queryFn: () => fetchProductService(params), 
  });
}

export default useProductList;