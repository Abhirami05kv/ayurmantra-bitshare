import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Paper,
  Grid2,
} from "@mui/material";
import { updateOrderStatusService } from "../../../services/orderService";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../config/queryClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
interface OrderFormValues {
  orderId: string;
  transactionId: string;
  status: string;
  reason?: string;
}

type OrderFormProps = {
  onClose: () => void;
  order: OrderDataProps;
};

function OrderForm({ onClose, order }: OrderFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormValues>({
    defaultValues: {
      orderId: order?.id?.toString(),
      transactionId: "", // Transaction ID is not required
      status: order?.status,
      reason: "",
    },
  });

  const selectedStatus = watch("status");
  const navigate = useNavigate();

  // Mutation for updating order status
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatusService(id, status),
    onSuccess: () => {
      // Invalidate orders query to refetch data
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      // Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Order status updated successfully!",
      }).then(() => {
        navigate("/orders"); 
      });

      // Close the form
      onClose();
    },
    onError: (error: any) => {
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response.data.message || "Failed to update order status.",
      });
      onClose();
    },
  });

  // Handle form submission
  const onSubmit = (data: OrderFormValues) => {
   
    const payload = {
      id: data.orderId,
      status: data.status,
    };
    console.log(payload);
    
    mutation.mutate(payload); 
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "auto", mt: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          {/* Order ID */}
          <Grid2 size={12}>
            <Controller
              name="orderId"
              control={control}
              rules={{ required: "Order ID is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Order ID"
                  fullWidth
                  disabled
                  error={!!errors.orderId}
                  helperText={errors.orderId?.message}
                />
              )}
            />
          </Grid2>

          {/* Transaction ID (Not Required) */}
          <Grid2 size={12}>
            <Controller
              name="transactionId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Transaction ID"
                  fullWidth
                  disabled
                  error={!!errors.transactionId}
                  helperText={errors.transactionId?.message}
                />
              )}
            />
          </Grid2>

          {/* Status Dropdown */}
          <Grid2 size={12}>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select {...field} label="Status">
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="payment_failed">Payment Failed</MenuItem>
                    <MenuItem value="payment_success">Payment Success</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="order_confirmed">Order Confirmed</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="return">Return</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                  </Select>
                )}
              />
              {errors.status && (
                <FormHelperText>{errors.status.message}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          {/* Reason Field (Conditional) */}
          {selectedStatus === "cancel" && (
            <Grid2 size={12}>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reason"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.reason}
                    helperText={errors.reason?.message}
                  />
                )}
              />
            </Grid2>
          )}

          {/* Buttons */}
          <Grid2 size={6} mt={2}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid2>

          <Grid2 size={6} mt={2}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
}

export default OrderForm;
