"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@/components/ui/button";


type AuthDialogProps = {
  onCloseDialog: () => void; // Callback to close the dialog
};

export default function AuthDialog({ onCloseDialog }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(true); 
 
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className={isLogin ? "sm:max-w-[425px]" : "sm:max-w-[800px]"}>
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>
        {isLogin ? (
          <LoginForm onCloseDialog={onCloseDialog} /> 
        ) : (
          <RegisterForm onCloseDialog={onCloseDialog} />
        )}
        <div className="text-center mt-4">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New user? Register here" : "Already have an account? Login here"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}