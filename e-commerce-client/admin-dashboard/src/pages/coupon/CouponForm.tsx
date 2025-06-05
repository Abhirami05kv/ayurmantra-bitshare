import { useForm, Controller } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  FormHelperText,
  Grid2,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { createCouponService, editCouponService } from "../../services/couponService";
import queryClient from "../../config/queryClient";
import Swal from "sweetalert2";
import { useEffect } from "react";

type CouponFormProps = {
  onClose: () => void;
  mode: DrawerModeProps;
  selectedCoupon:CouponDataProps
};

interface CouponFormValues {
  coupon_code: string;
  discount_type: string;
  usage_limit: number|string;
  discount_value?:number|string;
  discount_percentage?:number|string;
  min_purchase:number|string;
  expiry_date: string | null;
}

const CouponForm = ({ onClose, mode,selectedCoupon }: CouponFormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CouponFormValues>({
    defaultValues: {
      coupon_code: "",
      discount_type: "fixed",
      usage_limit: 0,
      discount_value: 0,
      discount_percentage: 0,
      min_purchase: 0,
      expiry_date: null,
    },
  });

  useEffect(() => {
    if (mode.isEdit && selectedCoupon) {
      reset({
        coupon_code: selectedCoupon?.coupon_code,
        discount_type:selectedCoupon?.discount_type,
        usage_limit:selectedCoupon?.usage_limit,
        expiry_date:selectedCoupon?.expiry_date,
        min_purchase:selectedCoupon?.min_purchase,
        discount_value:selectedCoupon?.discount_type=="fixed"?selectedCoupon?.discount_value:selectedCoupon?.discount_percentage
       
      });

      
    }
  }, [mode.isEdit, selectedCoupon,reset]);
  const createMutation = useMutation({
    mutationFn: createCouponService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Coupon created successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to add coupon",
      });
      onClose();
    },
  
  });
  const editMutation = useMutation({
    mutationFn: editCouponService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Coupon updated successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update coupon",
      });
      onClose();
    },
  });

  const onSubmit = (data: CouponFormValues) => {
    const payload = {
      ...data,
      usage_limit: Number(data.usage_limit),
      min_purchase: Number(data.min_purchase),
      expiry_date: data.expiry_date ? data.expiry_date : null,
    };

    
    if (data.discount_type === "fixed") {
      payload.discount_value = Number(data.discount_value);
      delete payload.discount_percentage; 
    } else if (data.discount_type === "percentage") {
      payload.discount_percentage = Number(data.discount_value);
      delete payload.discount_value; 
    }

    console.log("Form Data ", payload);

    if (mode.isAdd) {
      createMutation.mutate(payload);
    } else if (mode.isEdit && selectedCoupon.id) {
      editMutation.mutate({ id: selectedCoupon.id, couponDetails: payload });
    }
  };


  const discountType = watch("discount_type");

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          {/* Coupon Code */}
          <Grid2 size={12}>
            <Controller
              name="coupon_code"
              control={control}
              rules={{ required: "Coupon code is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Coupon Code"
                  fullWidth
                  error={!!errors.coupon_code}
                  helperText={errors.coupon_code?.message}
                />
              )}
            />
          </Grid2>

          {/* Discount Type */}
          <Grid2 size={12}>
            <FormControl fullWidth error={!!errors.discount_type}>
              <InputLabel>Discount Type</InputLabel>
              <Controller
                name="discount_type"
                control={control}
                rules={{ required: "Discount type is required" }}
                render={({ field }) => (
                  <Select {...field} label="Discount Type">
                    <MenuItem value="fixed">Fixed</MenuItem>
                    <MenuItem value="percentage">Percentage</MenuItem>
                  </Select>
                )}
              />
              {errors.discount_type && (
                <FormHelperText>{errors.discount_type.message}</FormHelperText>
              )}
            </FormControl>
          </Grid2>

          {/* Discount Value */}
          <Grid2 size={6}>
            <Controller
              name="discount_value"
              control={control}
              rules={{
                required: "Discount value is required",
                min: discountType === "percentage" ? 0 : 1, // Minimum value based on discount type
                max: discountType === "percentage" ? 100 : undefined, // Maximum value for percentage
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={
                    discountType === "fixed" ? "Discount Value" : "Discount Percentage"
                  }
                  type="number"
                  fullWidth
                  error={!!errors.discount_value}
                  helperText={errors.discount_value?.message}
                />
              )}
            />
          </Grid2>

          {/* Minimum Purchase */}
          <Grid2 size={6}>
            <Controller
              name="min_purchase"
              control={control}
              rules={{ required: "Minimum purchase is required", min: 0 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Min Purchase"
                  type="number"
                  fullWidth
                  error={!!errors.min_purchase}
                  helperText={errors.min_purchase?.message}
                />
              )}
            />
          </Grid2>

          {/* Usage Limit */}
          <Grid2 size={12}>
            <Controller
              name="usage_limit"
              control={control}
              rules={{ required: "Usage limit is required", min: 1 }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usage Limit"
                  type="number"
                  fullWidth
                  error={!!errors.usage_limit}
                  helperText={errors.usage_limit?.message}
                />
              )}
            />
          </Grid2>

          {/* Expiry Date */}
          <Grid2 size={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name="expiry_date"
    control={control}
    rules={{
      required: "Expiry date is required",
      validate: (value) =>
        dayjs(value).isValid() ? true : "Invalid date",
    }}
    render={({ field, fieldState }) => (
      <DateField
        {...field}
        label="Expiry Date"
        fullWidth
        value={field.value ? dayjs(field.value) : null} 
        onChange={(newValue) =>
          field.onChange(newValue ? dayjs(newValue).toISOString() : "")
        }
        slotProps={{
          textField: {
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
          },
        }}
      />
    )}
  />
</LocalizationProvider>

          </Grid2>

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
};

export default CouponForm;