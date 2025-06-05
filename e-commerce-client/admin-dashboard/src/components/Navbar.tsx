import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { List, ListItem, ListItemText, Divider, Button, Badge } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useNotificationList } from "../hooks/useNotification";
import { CustomDrawer } from "./CustomDrawer";

const settings = ["Logout"];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathWithoutLeadingSlash = location.pathname.replace(/^\/+|\/+$/, "");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: notifications = [] } = useNotificationList();

  // Show only first 10 notifications
  const displayedNotifications = notifications.slice(0, 10);
  const hasMoreNotifications = notifications.length > 10;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Profile") {
      console.log("profile");
    } else if (setting === "Logout") {
      Cookies.remove("admin");
      Cookies.remove("adminToken");
      navigate("/login");
    }
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleNotificationClick = (orderId: string | number) => {
    navigate(`/order/${orderId}`);
    setNotificationsOpen(false);
  };

  const handleViewMoreClick = () => {
    // Navigate to full notifications page or expand the list
    navigate("/notifications");
    setNotificationsOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Box sx={{ flexGrow: 1, backgroundColor: "#3a5e1e" }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                {pathWithoutLeadingSlash === ""
                  ? "Dashboard"
                  : pathWithoutLeadingSlash.charAt(0).toUpperCase() +
                    pathWithoutLeadingSlash.slice(1)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "30px",
                  gap: "30px",
                }}
              >
                <Box position="relative">
                  <IconButton onClick={toggleNotifications}>
                    <Badge 
                      badgeContent={notifications.length} 
                      color="error"
                      max={99} 
                    >
                      <NotificationsIcon sx={{ fontSize: 33, color: "white" }} />
                    </Badge>
                  </IconButton>
                </Box>

                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar sx={{ bgcolor: "#ff8214" }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleMenuItemClick(setting)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Notifications Drawer */}
      <CustomDrawer
        open={notificationsOpen}
        onClose={toggleNotifications}
        drawerHeading={"Notifications"}
      >
        <Box sx={{ width: 350, display: "flex", flexDirection: "column", height: "100%" }} role="presentation">
          <List sx={{ flex: 1, overflowY: "auto" }}>
            {displayedNotifications?.map((notification: any) => (
              <React.Fragment key={notification?.id}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => handleNotificationClick(notification?.orderId)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <CheckCircleIcon
                    color="success"
                    sx={{ mr: 2, fontSize: "1.5rem" }}
                  />
                  <ListItemText
                    primary={`Order received - #${notification?.orderId}`}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification?.userName}
                        </Typography>
                        {" — " +
                          (notification?.createdAt
                            ? new Date(notification.createdAt).toLocaleString()
                            : "")}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
            {notifications?.length === 0 && (
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            )}
          </List>
          
          {/* View More button at the bottom */}
          {hasMoreNotifications && (
            <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
              <Button
                fullWidth
                variant="text"
                onClick={handleViewMoreClick}
                sx={{ justifyContent: "center"}}
              >
                View all notifications ({notifications.length})
              </Button>
            </Box>
          )}
        </Box>
      </CustomDrawer>
    </>
  );
}