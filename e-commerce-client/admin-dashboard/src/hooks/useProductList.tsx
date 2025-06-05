import { useQuery } from "@tanstack/react-query"
import { fetchProductService } from "../services/productService"

//hook for fetching all products
function useProductList() {
  return useQuery({
    queryKey:["products"],
    queryFn:fetchProductService
  })
}

export default useProductList