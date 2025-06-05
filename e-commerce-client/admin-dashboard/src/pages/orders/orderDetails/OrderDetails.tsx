import { 
  Chip, Divider, Paper, Typography, 
  Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Card, CardContent, IconButton, Avatar,
  Grid2
} from "@mui/material";
import { Payment, Person, CalendarToday } from "@mui/icons-material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs"; 
import { OrderDetailsTableColumns } from "../../../constants/OrderDetailsColumn";

interface OrderDetailsProps {
  changeMode: (key: keyof DrawerModeProps, status: boolean) => void;
  order: any;
}

function OrderDetails({ changeMode, order }: OrderDetailsProps) {
  const handleEditOrder = () => {
    changeMode("isEdit", true);
  };

  console.log(order);

  return (
    <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
      <Grid2 container alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight={600}>
          Order Details
        </Typography>
        <IconButton onClick={handleEditOrder}>
          <EditNoteIcon />
        </IconButton>
      </Grid2>

      {/* Order Info */}
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={6}>
          <Typography variant="body1" color="textSecondary">
            Order ID: <strong>{order?.id || "---"}</strong>
          </Typography>
        </Grid2>
        <Grid2 size={6} textAlign="right">
          <Chip label={order?.status || "Unknown"} color="success" size="small" />
        </Grid2>
      </Grid2>

      <Typography variant="body2" color="textSecondary" mt={1} display="flex" alignItems="center">
        <CalendarToday fontSize="small" sx={{ marginRight: 1 }} /> 
        {order?.date ? dayjs(order.date).format("DD/MM/YYYY") : "---"}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid2 container spacing={3}>
        {/* Order Items */}
        <Grid2 size={8}>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Order Items
            </Typography>
            <TableContainer sx={{ borderRadius: 1, boxShadow: 1 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "#AAE48F" }}>
                  <TableRow>
                    {OrderDetailsTableColumns.map((column) => (
                      <TableCell key={column.id} sx={{ fontWeight: 600 }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.orderItems?.length > 0 ? (
                    order.orderItems.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item?.id || "---"}</TableCell>
                        <TableCell>{item?.product?.name || "product"}</TableCell>
                        <TableCell>{item?.product?.category?.name || "category"}</TableCell>
                        <TableCell>${item?.price || "---"}</TableCell>
                        <TableCell>{item?.quantity || "---"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No items in this order
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid2>

        {/* Customer & Payment Details */}
        <Grid2 size={4}>
          <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} display="flex" alignItems="center" gutterBottom>
                <Avatar sx={{ bgcolor: "#AAE48F", marginRight: 1 }}>
                  <Person fontSize="small" />
                </Avatar> 
                Customer Details
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2"><span className="text-gray-500">Name:</span> {order?.user?.name || "Not Available"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Email:</span> {order?.user?.email || "Not Available"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Customer ID:</span> {order?.user?.id || "---"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Phone:</span> {order?.user?.phone || "Not Available"}</Typography>
              <Typography variant="body2">
  <span className="text-gray-500">Address:</span>{" "}
  {order?.shippingAddress
    ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`
    : "Not Available"}
</Typography>
            </CardContent>

            <Divider />

            {/* Payment Details */}
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} display="flex" alignItems="center" gutterBottom>
                <Avatar sx={{ bgcolor: "#AAE48F", marginRight: 1 }}>
                  <Payment fontSize="small" />
                </Avatar> 
                Payment Details
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body2"><span className="text-gray-500">Payment Method:</span> {order?.paymentMethod || "Not Available"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Transaction ID:</span> {order?.transactionId || "Not Available"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Status:</span> {order?.paymentStatus || "Pending"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Date:</span> {order?.date ? dayjs(order.date).format("DD/MM/YYYY") : "---"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Total Price:</span> ${order?.totalAmount || "0.00"}</Typography>
              <Typography variant="body2"><span className="text-gray-500">Tax:</span> ${order?.tax || "0.00"}</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Paper>
  );
}

export default OrderDetails;
