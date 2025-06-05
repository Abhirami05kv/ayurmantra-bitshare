import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import IconButton from "@mui/material/IconButton";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { label: "Dashboard", icon: <DashboardCustomizeOutlinedIcon />, path: "/" },
    {
      label: "User Management",
      icon: <PersonOutlineOutlinedIcon />,
      path: "user",
    },
    {
      label: "Category Management",
      icon: <CategoryOutlinedIcon />,
      path: "/category",
    },
    {
      label: "Product Management",
      icon: <ShoppingBagOutlinedIcon />,
      path: "/product",
    },

    {
      label: "Order Management",
      icon: <ShoppingCartOutlinedIcon />,
      path: "/orders",
    },

    {
      label: "Coupon Management",
      icon: <DiscountOutlinedIcon />,
      path: "/offer",
    },
    {
      label: "Giftcard Management",
      icon: <CardGiftcardOutlinedIcon />,
      path: "/gift-card",
    },
    {
      label: "Notifications",
      icon: <NotificationsOutlinedIcon />,
      path: "/notifications",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor="white"
        className={`shadow min-h-screen transition-all ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-2 mt-5">
          <IconButton onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <SpaOutlinedIcon />
          </IconButton>
        </div>

        {/* Sidebar Menu */}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                backgroundColor: "#3a5e1e",
                color: "white",
              },
              padding: "10px 15px",
              width: "100%",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              className={`flex items-center text-black ${
                location.pathname === item.path ? "bg-[#3a5e1e24] " : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
