"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { editUserApi } from "../api/userApi";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import queryClient from "../config/queryClient";
import { toast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: number;
}

interface ContactDialogProps {
  initialValues?: ContactFormData;
}

function ContactDialog({ initialValues }: ContactDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: initialValues,
  });

  const editContactMutation = useMutation({
    mutationFn: (updatedContact: ContactFormData) => {
      const userId = Cookies.get("user")
        ? JSON.parse(Cookies.get("user")!).id
        : null;
      if (!userId) {
        throw new Error("User ID not found.");
      }

      return editUserApi(userId, updatedContact);
    },
    onSuccess: (data) => {
      // Update the user data in cookies
      const user = Cookies.get("user")
        ? JSON.parse(Cookies.get("user")!)
        : null;
      if (user) {
        const updatedUser = { ...user, ...data };
        Cookies.set("user", JSON.stringify(updatedUser));
      }

      // Invalidate the user query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Show success toast
      toast({
        title: "Contact Updated",
        description: "Your contact information has been updated successfully.",
        variant: "default",
      });

      // Close the dialog and reset the form
      setIsDialogOpen(false);
      reset();
    },
    onError: (error) => {
      // Show error toast
      console.error("error in updatedContact", error);

      toast({
        title: "Failed to Update Contact",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    // Convert phoneNumber to a number before submitting
    const updatedData = {
      ...data,
      phoneNumber: Number(data.phoneNumber),
    };
   

    editContactMutation.mutate(updatedData);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/, // Ensure it's exactly 10 digits
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600"
            disabled={editContactMutation.isPending}
          >
            {editContactMutation.isPending ? "Saving..." : "Save Contact"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContactDialog;
