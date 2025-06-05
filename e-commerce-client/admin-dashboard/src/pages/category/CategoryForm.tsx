import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid2,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { createCategoryService, editCategoryService } from "../../services/categoryService";
import queryClient from "../../config/queryClient";
import Swal from "sweetalert2";
import { Loader } from "../../components/Loader";

type CategoryFormProps = {
  onClose: () => void;
  mode: DrawerModeProps;
  selectedCategory: CategoryDataProps | null;
};

interface CategoryData {
  name: string;
  description: string;
  status: string;
}

const CategoryForm = ({ onClose, mode, selectedCategory }: CategoryFormProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CategoryData>({
    defaultValues: {
      name: "",
      description: "",
      status: "Active",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (mode.isEdit && selectedCategory) {
      reset({
        name: selectedCategory.name,
        description: selectedCategory.description,
        status: selectedCategory.status,
      });
    }
  }, [selectedCategory, mode.isEdit, reset]);

  // Mutation function based on mode (create or edit)
  const mutationFn = mode.isEdit
    ? (data: CategoryData) => editCategoryService(selectedCategory?.id ?? "", data)
    : createCategoryService;

  // Mutation for creating/editing category
  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      // Invalidate categories query to refetch data
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: mode.isEdit ? "Category updated successfully!" : "Category created successfully!",
      });

      // Close the form
      onClose();
    },
    onError: (error: any) => {
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response.data.message || (mode.isEdit ? "Failed to update category." : "Failed to create category."),
      });
      onClose();
    },
  });

  // Handle form submission
  const onSubmit = (data: CategoryData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      {/* Name Input */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Category Name"
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* Description Input */}
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Description"
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      {/* Status Dropdown */}
      <FormControl fullWidth margin="normal" error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <Select {...field} label="Status">
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          )}
        />
        {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
      </FormControl>

      {/* Buttons */}
      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={6}>
          <Button variant="outlined" color="error" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Button type="submit" variant="contained" color="success" fullWidth disabled={isPending}>
            {isPending ? <Loader/> : mode.isEdit ? "Update" : "Submit"}
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default CategoryForm;