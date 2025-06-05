import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { CouponTableColumns } from "../../constants/CouponTableColumn";
import useCouponList from "../../hooks/useCouponList";
import { Loader } from "../../components/Loader";
import dayjs from "dayjs";
import NoDataAvailable from "../../components/NodataAvailable";

interface CouponTableProps {
  changeMode: (key: keyof DrawerModeProps, status: boolean) => void;
  setSelectedCoupon:(coupon:CouponDataProps)=>void
}

function CouponTable({ changeMode,setSelectedCoupon }: CouponTableProps) {
  const handleEditCoupon = (coupon:CouponDataProps) => {
    changeMode("isEdit", true);
    setSelectedCoupon(coupon)
  };

  const { data, isLoading, isError } = useCouponList();
  const coupons = data?.coupons ? data.coupons : [];
 

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {CouponTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{ fontWeight: 500, color: "gray", fontSize: 17 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={CouponTableColumns.length} align="center">
                  <Box display="flex" justifyContent="center" py={3}>
                    <Loader />
                  </Box>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={CouponTableColumns.length} align="center">
                  <Typography color="error" fontWeight="bold">
                    <NoDataAvailable />
                  </Typography>
                </TableCell>
              </TableRow>
            ) : coupons.length > 0 ? (
              coupons.map((coupon: any) => (
                <TableRow key={coupon.id} >
                  <TableCell>{coupon?.id || "---"}</TableCell>
                  <TableCell>{coupon?.coupon_code || "---"}</TableCell>
                  <TableCell>{coupon?.usage_limit || "--"}</TableCell>
                  <TableCell>
                    {coupon?.is_active ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    {coupon.discount_type === "percentage"
                      ? `${coupon?.discount_percentage}%`
                      : `$${coupon?.discount_value}`}
                  </TableCell>
                  <TableCell>
                    {coupon.expiry_date
                      ? dayjs(coupon?.expiry_date).format("DD/MM/YYYY")
                      : "--"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={()=>handleEditCoupon(coupon)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={CouponTableColumns.length} align="center">
                  <NoDataAvailable />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CouponTable;
