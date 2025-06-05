import React from "react";
import { User, Package, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUser } from "@/app/redux/slice/authSlice";
import { PiGift } from "react-icons/pi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
interface SidebarContentProps {
  onItemClick: (label: string) => void;
}

function SidebarContent({ onItemClick }: SidebarContentProps) {
  const router =useRouter()
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    Cookies.remove("user");
    Cookies.remove("token");

    router.push("/");
  };
  const handleReset= () => {
 

    router.push("/forgot-password");
  };
  const sidebarItems = [
    { icon: User, label: "Profile" },
    { icon: Package, label: "Orders" },
    { icon: PiGift, label: "Giftcards" }, 
    { icon: MdOutlineAdminPanelSettings, label: "Reset Password", onClick: handleReset }, 
    { icon: LogOut, label: "Logout", onClick: handleLogout }, 

  ];

  return (
    <div className="p-4">
      <nav>
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (item.onClick) {
                item.onClick(); 
              } else {
                onItemClick(item.label); 
              }
            }}
            className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
          >
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default SidebarContent;