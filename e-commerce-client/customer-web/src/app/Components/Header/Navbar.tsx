"use client";
import React from "react";
import Navlinks from "./NavLinks";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";



export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  

  return (
    <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 py-2">
      <div>
        <img src="/images/ayurmanthralogo.png" alt="Logo" className="h-20 w-40" />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex">
          <Navlinks/>
        </div>

        <button
          className="md:hidden p-2 focus:outline-none text-orange-700"
          onClick={() => setShowMenu(!showMenu)}>
          <HiOutlineMenu size={24} />
        </button>
        
        <div className="flex items-center gap-3">
          <a href="#" className="p-2 bg-[#7FB53D] text-white rounded-full hover:bg-green-100 hover:text-[#7FB53D]">
            <FaFacebookF size={16} />
          </a>
          <a href="#" className="p-2 bg-[#7FB53D] text-white rounded-full hover:bg-green-100 hover:text-[#7FB53D]">
            <FaInstagram size={16} />
          </a>
          <a href="#" className="p-2 bg-[#7FB53D] text-white rounded-full hover:bg-green-100 hover:text-[#7FB53D]">
            <FaTwitter size={16} />
          </a>
          <a href="#" className="p-2 bg-[#7FB53D] text-white rounded-full hover:bg-green-100 hover:text-[#7FB53D]">
            <FaLinkedinIn size={16} />
          </a>
        </div>
      </div>

      {showMenu && (
        <div className="absolute top-16 left-4 right-4 bg-white shadow-md rounded-lg p-4 z-50 md:hidden">
          <Navlinks />
        </div>
      )}
    </div>
  );
}


