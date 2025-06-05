
import {  Card, CardContent, Typography, Box, Grid2 } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useDashBoardList } from "../../hooks/useDashboardList";


function DashboardTiles() {
  
const {data:dashboard={}}=useDashBoardList()

const stats = [
  {
    title: "Total Sales",
    value: `${dashboard?.data?.totalSales || 0}`,
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#333" }} />,
  },
  {
    title: "Total Users",
    value: `${dashboard?.data?.totalUsers || 0}`,
    icon: <PermIdentityOutlinedIcon sx={{ fontSize: 40, color: "#333" }} />,
  },
  {
    title: "Total Products",
    value: `${dashboard?.data?.totalProducts || 0}`,
    icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: "#333" }} />,
  },
  {
    title: "Pending Orders",
    value: `${dashboard?.data?.totalOrders || 0}`,
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 40, color: "#333" }} />,
  },
];

  return (
    <Grid2 container spacing={3} mb={3}>
      {stats.map((stat, index) => (
        <Grid2 size={3} key={index}>
          <Card
            sx={{
              textAlign: "center",
              p: 3,
              borderRadius: 2,
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#f5f5f5",
                mx: "auto",
                mb: 2,
              }}
            >
              {stat.icon}
            </Box>
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6" fontWeight="bold">
                {stat.title}
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default DashboardTiles;
