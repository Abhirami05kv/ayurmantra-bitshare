import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Paper, Grid2 } from "@mui/material";
import { editUserService } from "../../services/userService";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../config/queryClient";
import { Loader } from "../../components/Loader";
import Swal from "sweetalert2"; 

type UserFormValues = {
  userId: string;
  name: string;
  email: string;
  is_active: boolean;
};

type UserFormProps = {
  onClose: () => void;
  selectedUser: any;
  mode: DrawerModeProps;
};

function UserForm({ onClose, selectedUser, mode }: UserFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    defaultValues: {
      userId: "",
      name: "",
      email: "",
      is_active: true, 
    },
  });

  useEffect(() => {
    if (mode.isEdit && selectedUser) {
      reset({
        userId: selectedUser.id?.toString() || "",
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        is_active: selectedUser.is_active ?? true,
      });
    }
  }, [mode.isEdit, selectedUser, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Omit<UserFormValues, "userId">) => editUserService(selectedUser?.id ?? "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose(); 
      // Show SweetAlert on success
      Swal.fire({
        title: "Success!",
        text: mode.isEdit ? "User updated successfully!" : "User created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        onClose(); 
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const onSubmit = (data: UserFormValues) => {
    const { userId, ...payload } = data;
    mutate(payload);
  };

  return (
    <Paper sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          {/* User ID Field */}
          <Grid2 size={12}>
            <Controller
              name="userId"
              control={control}
              rules={{ required: "User ID is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="User ID"
                  disabled
                  error={!!errors.userId}
                  helperText={errors.userId?.message}
                />
              )}
            />
          </Grid2>

          {/* Name Field */}
          <Grid2 size={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>

          {/* Email Field */}
          <Grid2 size={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid2>

          {/* Status Dropdown (is_active) */}
          <Grid2 size={12}>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Status"
                  value={field.value ? "active" : "inactive"}
                  onChange={(e) => field.onChange(e.target.value === "active")}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              )}
            />
          </Grid2>

          {/* Buttons */}
          <Grid2 size={6}>
            <Button variant="outlined" color="error" fullWidth onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button type="submit" variant="contained" color="success" fullWidth disabled={isPending}>
              {isPending ? <Loader /> : "Submit"}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
}

export default UserForm;