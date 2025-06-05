import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoute = ({ element }:any) => {
  const user = Cookies.get("admin")

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
