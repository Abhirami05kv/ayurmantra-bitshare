"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginService } from "@/app/api/userApi";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { setUser } from "@/app/redux/slice/authSlice";
import { useDispatch} from "react-redux";


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
    phoneNumber: string;
    role: string;
    address: [];
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


export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation<ApiResponse, Error, LoginFormData>({
    mutationFn: (loginDetails: LoginFormData) => loginService(loginDetails),
    onSuccess: (data) => {
      toast({
        title: "Welcome back! 👋",
        description: "Successfully logged in to your account.",
        variant: "default",
      });
      dispatch(setUser(data.user));
      Cookies.set("user", JSON.stringify(data.user), { expires: 30 });
      Cookies.set("token", data.token, { expires: 30 });

      router.push("/shop");
    },
    onError: (error:ApiError) => {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Please check your credentials and try again.",
        variant: "destructive",
      });

     
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        if (error.message) {
          toast({
            title: "Validation Error",
            description: error.message,
            variant: "destructive",
          });
        }
      });
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className=" flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="pl-10"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-10 pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>

        {/* Footer with Sign Up Link */}
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <p className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
        <Toaster />
    </div>
  );
}