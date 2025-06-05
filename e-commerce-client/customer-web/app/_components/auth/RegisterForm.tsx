"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { createUserService } from "@/app/api/userApi";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/app/redux/slice/authSlice";
import { useDispatch } from "react-redux";

type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: Address[];
};

type ApiResponse = {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    is_active: boolean;
    address: Address[];
    createdAt: string;
  };
  token: string;
};
interface ApiError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
}
type RegisterFormProps = {
  onCloseDialog: () => void;
};

export default function RegisterForm({ onCloseDialog }: RegisterFormProps) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      address: [
        {
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
      ],
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "address",
  });

  const mutation = useMutation<ApiResponse, Error, RegisterFormData>({
    mutationFn: (userData: RegisterFormData) => {
      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address: userData.address,
      };
      return createUserService(payload);
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      // Store user data and token in cookies
      Cookies.set("user", JSON.stringify(data.user), { expires: 30 });
      Cookies.set("token", data.token, { expires: 30 });
    
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "You have been successfully registered.",
      });
      onCloseDialog();
    },
    onError: (error: ApiError) => {
      toast({
        title: "Registration Failed",
        description:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number (must be 10 digits)",
                },
              })}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Address Fields */}
          <div>
            <Label>Address</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 border p-4 rounded mb-4">
                <div>
                  <Label htmlFor={`address.${index}.street`}>Street</Label>
                  <Input
                    id={`address.${index}.street`}
                    {...register(`address.${index}.street`, {
                      required: "Street is required",
                    })}
                    placeholder="Enter street"
                  />
                  {errors.address?.[index]?.street && (
                    <p className="text-sm text-red-500">
                      {errors.address[index]?.street?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`address.${index}.city`}>City</Label>
                  <Input
                    id={`address.${index}.city`}
                    {...register(`address.${index}.city`, {
                      required: "City is required",
                    })}
                    placeholder="Enter city"
                  />
                  {errors.address?.[index]?.city && (
                    <p className="text-sm text-red-500">
                      {errors.address[index]?.city?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`address.${index}.state`}>State</Label>
                  <Input
                    id={`address.${index}.state`}
                    {...register(`address.${index}.state`, {
                      required: "State is required",
                    })}
                    placeholder="Enter state"
                  />
                  {errors.address?.[index]?.state && (
                    <p className="text-sm text-red-500">
                      {errors.address[index]?.state?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`address.${index}.country`}>Country</Label>
                  <Input
                    id={`address.${index}.country`}
                    {...register(`address.${index}.country`, {
                      required: "Country is required",
                    })}
                    placeholder="Enter country"
                  />
                  {errors.address?.[index]?.country && (
                    <p className="text-sm text-red-500">
                      {errors.address[index]?.country?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`address.${index}.zipCode`}>Zip Code</Label>
                  <Input
                    id={`address.${index}.zipCode`}
                    {...register(`address.${index}.zipCode`, {
                      required: "Zip code is required",
                    })}
                    placeholder="Enter zip code"
                  />
                  {errors.address?.[index]?.zipCode && (
                    <p className="text-sm text-red-500">
                      {errors.address[index]?.zipCode?.message}
                    </p>
                  )}
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove Address
                  </Button>
                )}
              </div>
            ))}
            {/* <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  street: "",
                  city: "",
                  state: "",
                  country: "",
                  zipCode: "",
                })
              }
            >
              Add Another Address
            </Button> */}
          </div>
        </div>
      </div>

      {/* Root Error */}
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
