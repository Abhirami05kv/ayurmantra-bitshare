import { useQuery } from '@tanstack/react-query';
import { fetchCategoryService } from '../api/categoryApi';


// Hook for fetching all categories
function useCategoryList() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryService,
  });
}

export default useCategoryList;