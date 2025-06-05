import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Paper, IconButton, Grid2 } from "@mui/material";
import { Upload, Delete } from "@mui/icons-material";
import useCategoryList from "../../hooks/useCategoryList";
import { createProductService, editProductService } from "../../services/productService";
import queryClient from "../../config/queryClient";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

type ProductFormProps = {
  onClose: () => void;
  mode: DrawerModeProps;
  selectedProduct: any;
};

function ProductForm({ onClose, mode, selectedProduct }: ProductFormProps) {
  const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      stock: 0,
      price: 0.00,
      status: "Active",
      image: [] as File[],
    },
  });

  const { data: categories } = useCategoryList(1, 0, false);
  const image = watch("image");
  const [existingImages, setExistingImages] = useState<string[]>([]); 
  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;
  // Populate form when editing
  useEffect(() => {
    if (mode.isEdit && selectedProduct) {
      reset({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        category: selectedProduct.categoryId || "",
        stock: selectedProduct.stock || 0,
        price: selectedProduct.price || 0.00,
        status: selectedProduct.status || "Active",
        image: [],
      });

      // Set existing images from selectedProduct
      if (selectedProduct.imageUrls) {
        setExistingImages([selectedProduct.imageUrls]);
      }
    }
  }, [mode.isEdit, selectedProduct, reset]);

  // Mutation for Create Product
  const createMutation = useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product created successfully.',
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error?.response?.data?.message || 'Failed to create product.',
      });
      onClose();
    },
  });

  // Mutation for Edit Product
  const editMutation = useMutation({
    mutationFn: (data: any) => editProductService(selectedProduct?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product updated successfully.',
      });
      onClose();
    },
    onError: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error?.response?.data?.message || 'Failed to update product.',
      });
      onClose();
    },
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price).toFixed(2),
    };
    console.log("Formatted Data:", formattedData);
    const formData = new FormData();
    formData.append("name", formattedData.name);
    formData.append("description", formattedData.description);
    formData.append("categoryId", formattedData.category);
    formData.append("stock", String(Number(formattedData.stock)));
    formData.append("price", formattedData.price);

    if (formattedData.image.length > 0) {
      formattedData.image.forEach((file: File) => {
        formData.append("image", file);
      });
    }
    if (mode.isEdit) {
     
      editMutation.mutate(formData);
    } else {
     
      createMutation.mutate(formData);
    }
   
    
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("image", [...image, ...files]);
  };

  const removeImage = (index: number) => {
    const updatedImage = [...image];
    updatedImage.splice(index, 1);
    setValue("image", updatedImage);
  };

  const removeExistingImage = (index: number) => {
    const updatedExistingImages = [...existingImages];
    updatedExistingImages.splice(index, 1);
    setExistingImages(updatedExistingImages);
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          {/* Name */}
          <Grid2 size={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => (
                <TextField {...field} label="Product Name" variant="outlined" size="small" fullWidth error={!!errors.name} helperText={errors.name?.message} />
              )}
            />
          </Grid2>

          {/* Description */}
          <Grid2 size={12}>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField {...field} label="Description" variant="outlined" size="small" fullWidth multiline rows={3} error={!!errors.description} helperText={errors.description?.message} />
              )}
            />
          </Grid2>

          {/* Category */}
          <Grid2 size={12}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <TextField {...field} select label="Category" size="small" variant="outlined" fullWidth error={!!errors.category} helperText={errors.category?.message}>
                  {categories?.data?.map((category: any) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid2>

          {/* Stock & Price */}
          <Grid2 size={12}>
            <Controller
              name="stock"
              control={control}
              rules={{ required: "Stock is required", min: { value: 0, message: "Stock must be at least 0" } }}
              render={({ field }) => (
                <TextField {...field} label="Stock" type="number" size="small" variant="outlined" fullWidth error={!!errors.stock} helperText={errors.stock?.message} />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required", min: { value: 0, message: "Price must be at least 0" } }}
              render={({ field }) => (
                <TextField {...field} label="Price" type="number" size="small" variant="outlined" fullWidth inputProps={{ step: "0.01" }} error={!!errors.price} helperText={errors.price?.message} />
              )}
            />
          </Grid2>

          {/* Image Upload */}
          <Grid2 size={12}>
            
              <Button variant="outlined" component="label" fullWidth disabled={image.length > 0} startIcon={<Upload />}>
                Upload image
                <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
              </Button>
           

            {/* Preview Existing Images */}
            {existingImages.length > 0 && (
              <Grid2 container spacing={2} mt={1}>
                {existingImages.map((imageUrl: string, index: number) => (
                  <Grid2 size={12} key={index}>
                    <Paper sx={{ p: 1, textAlign: "center", position: "relative" }}>
                      <img src={`${IMAGE_BASE_URL}${imageUrl}`} alt="Existing Preview" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: 4 }} />
                      <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => removeExistingImage(index)}>
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </Paper>
                  </Grid2>
                ))}
              </Grid2>
            )}

            {/* Preview New Uploaded Images */}
            {image.length > 0 && (
              <Grid2 container spacing={2} mt={1}>
                {image.map((file: File, index: number) => (
                  <Grid2 size={12} key={index}>
                    <Paper sx={{ p: 1, textAlign: "center", position: "relative" }}>
                      <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: 4 }} />
                      <IconButton size="small" sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => removeImage(index)}>
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </Paper>
                  </Grid2>
                ))}
              </Grid2>
            )}
          </Grid2>

          {/* Buttons */}
          <Grid2 size={12} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              {createMutation.isPending || editMutation.isPending ? "Saving..." : "Submit"}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
}

export default ProductForm;