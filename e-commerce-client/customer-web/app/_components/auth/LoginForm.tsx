"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie"; 
import { loginService } from "@/app/api/userApi"; 
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/slice/authSlice";
type LoginFormData = {
  email: string;
  password: string;
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
    address: [];
    createdAt: string;
  };
  token: string;
};
type LoginFormProps = {
  onCloseDialog: () => void; 
};
interface ApiError extends Error {
  response?: {
    data?: {
      message: string;
    };
  };
}
export default function LoginForm({onCloseDialog}:LoginFormProps) {
  const { toast } = useToast(); 
  const dispatch =useDispatch()
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  
  const mutation = useMutation<ApiResponse, Error, LoginFormData>({
    mutationFn: (loginDetails: LoginFormData) => loginService(loginDetails),
    onSuccess: (data) => {
      toast({
        title: "Login Successful",
        description: "You have been successfully Logged in.",
      });
      onCloseDialog()
      dispatch(setUser(data.user));
      Cookies.set("user", JSON.stringify(data.user), { expires: 30 }); 
      Cookies.set("token", data.token, { expires: 30 });
    },
    onError: (error: ApiError) => {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Registration failed. Please try again.",
        variant: "destructive", 
      });
   
    
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutation.mutate(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}