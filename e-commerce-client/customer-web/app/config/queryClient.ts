
import { QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, 
      staleTime: 5 * 60 * 1000, 
      refetchOnWindowFocus: false, 
    },
  },
});

export default queryClient;
