import { useQuery } from '@tanstack/react-query';
import { fetchCategoryService } from '../services/categoryService';


function useCategoryList(page: number, limit: number, paginate: boolean = true) {
  return useQuery({
    queryKey: ["categories", page, limit, paginate], 
    queryFn: () => fetchCategoryService(page, limit, paginate),
  });
}

export default useCategoryList;