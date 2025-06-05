import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Paper,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid2,
} from "@mui/material";
import { createGiftCardService, editGiftCardService } from "../../services/giftcardservice";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../config/queryClient";
import Swal from "sweetalert2";
import { useEffect } from "react";


interface GiftcardFormValues {
  title: string;
  purchaseAmount: string|number;
  image: File | null | string;
  usableAmount: string|number;
  description: string;
}
type GiftcardFormProps = {
  onClose: () => void;
  mode: DrawerModeProps;
  selectedGiftCard: GiftCard | null;
};
function GiftcardForm({ selectedGiftCard, mode, onClose }: GiftcardFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GiftcardFormValues>({
    defaultValues: {
      title: "",
      purchaseAmount: "",
      image: null,
      usableAmount: "",
      description: "",
    },
  });
  console.log(selectedGiftCard, "selected card");
  // const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (mode.isEdit && selectedGiftCard) {
      reset({
        title: selectedGiftCard?.title || "",
        purchaseAmount: selectedGiftCard?.purchaseAmount ,
        usableAmount: selectedGiftCard?.usableAmount || "",
        description: selectedGiftCard?.description || "",
        image: selectedGiftCard?.image || null,
      });
    }
  }, [mode.isEdit, selectedGiftCard, reset]);
  const createMutation = useMutation({
    mutationFn: createGiftCardService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftcards"] });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Gift card created successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to create gift card.",
      });
      onClose();
    },
  });
  const editMutation = useMutation({
    mutationFn: (formData: any) => {
      if (!selectedGiftCard?.id) {
        throw new Error("No gift card selected for editing.");
      }
      return editGiftCardService(selectedGiftCard.id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftcards"] });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Gift card updated successfully.",
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update gift card.",
      });
      onClose();
    },
  });
  const onSubmit = (data: any) => {
    const formData = new FormData();
  
    formData.append("title", data.title);
    formData.append("purchaseAmount", data.purchaseAmount);
    formData.append("usableAmount", data.usableAmount);
    formData.append("description", data.description);
  

    if (data.expiryDate) {
      formData.append("expiryDate", data.expiryDate.toISOString());
    }
  
    if (data.image) {
      formData.append("image", data.image);
    }
  
    if (mode.isAdd) {
      createMutation.mutate(formData);
    } else {
   
      if (selectedGiftCard?.id) {
        editMutation.mutate(formData);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "No gift card selected for editing.",
        });
      }
    }
    
    
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          {/* Title Input */}
          <Grid2 size={12}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  rows={3}
                  multiline
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid2>

          {/* Purchase Amount Input */}
          <Grid2 size={6}>
            <Controller
              name="purchaseAmount"
              control={control}
              rules={{
                required: "Purchase Amount is required",
                min: { value: 0, message: "Purchase Amount must be positive" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Purchase Amount"
                  type="number"
                  fullWidth
                  error={!!errors.purchaseAmount}
                  helperText={errors.purchaseAmount?.message}
                />
              )}
            />
          </Grid2>

          {/* Usable Amount Input */}
          <Grid2 size={6}>
            <Controller
              name="usableAmount"
              control={control}
              rules={{
                required: "Usable Amount is required",
                min: { value: 0, message: "Usable Amount must be positive" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usable Amount"
                  type="number"
                  fullWidth
                  error={!!errors.usableAmount}
                  helperText={errors.usableAmount?.message}
                />
              )}
            />
          </Grid2>

          {/* Image Upload Input */}
          <Grid2 size={12}>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.image}>
                  <InputLabel shrink htmlFor="image-upload">
                    Image
                  </InputLabel>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    style={{ marginTop: 16 }}
                  />
                  {errors.image && (
                    <FormHelperText>{errors.image.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid2>
          {/* Cancl button */}
          <Grid2 size={6}>
            <Button variant="outlined" color="error" fullWidth sx={{ mt: 2 }}>
              Cancel
            </Button>
          </Grid2>
          {/* Submit Button */}
          <Grid2 size={6}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
}

export default GiftcardForm;
