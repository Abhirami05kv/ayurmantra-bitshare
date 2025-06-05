"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface CustomButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  href,
  children,
  className = "",
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-block 
        bg-[#0f8f3e]
        text-white 
        py-3  
        px-12 
        text-md
        font-medium 
        rounded-lg
        shadow-lg  
        hover:shadow-2xl 
        hover:font-semibold
        transition-all 
        duration-500 
        relative 
        overflow-hidden 
        group 
        text-center
        transform 
        hover:-translate-y-2
        ${className}
      `}
    >
      <span className="relative z-10 block">{children}</span>
      <span className="absolute inset-0 w-0 bg-[#843041] transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full"></span>
    </button>
  );
};

export default CustomButton;
