import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Index";
import AdminLayout from "../layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/dashboard/Index";
import Category from "../pages/category/Index";
import Products from "../pages/products/Index";
import OrderManagement from "../pages/orders/Index";
import Coupon from "../pages/coupon/Index";
import Notifications from "../pages/notifications/Index";
import OrderDetails from "../pages/orders/orderDetails/Index";
import User from "../pages/user";
import GiftcardManagement from "../pages/giftcard";

export const AppRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
 

  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "category",
        element: <PrivateRoute element={<Category />} />,
      },
      {
        path: "product",
        element: <PrivateRoute element={<Products />} />,
      },
      {
        path: "orders",
        element: <PrivateRoute element={<OrderManagement />} />,
      },
      {
        path: "order/:id",
        element: <PrivateRoute element={<OrderDetails />} />,
      },
      {
        path: "offer",
        element: <PrivateRoute element={<Coupon />} />,
      },
      {
        path: "gift-card",
        element: <PrivateRoute element={<GiftcardManagement />} />,
      },
      {
        path: "notifications",
        element: <PrivateRoute element={<Notifications />} />,
      },
      {
        path: "user",
        element: <PrivateRoute element={<User />} />,
      },
    ],
  },
]);
