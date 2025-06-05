import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

type CustomDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  drawerHeading: string;
};

export const CustomDrawer = ({
  open,
  onClose,
  children,
  drawerHeading,
}: CustomDrawerProps) => {
  return (
    <div>
      <>
        <Drawer anchor={"right"} open={open} onClose={onClose}>
          <AppBar position="static" color="success">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {drawerHeading}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={onClose}
              >
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box role="presentation">{children}</Box>
        </Drawer>
      </>
    </div>
  );
};
