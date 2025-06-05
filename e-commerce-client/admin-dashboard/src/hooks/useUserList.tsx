
import { useQuery } from '@tanstack/react-query';
import { getUserService } from '../services/userService';


//hook for fetching all users
function useUserList() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUserService,
  });
  
}

export default useUserList