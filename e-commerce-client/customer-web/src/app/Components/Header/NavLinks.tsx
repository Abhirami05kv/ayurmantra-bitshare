"use client";
import React from 'react'
import { Menu,MenuButton,MenuItem,MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';


export default function Navlinks () {
    return(
        <nav style={{ fontFamily: "'Onest', sans-serif" }} className='flex items-center gap-6 text-base font-semibold text-black text-2xl'>
            <Link href="/" className="hover:text-green-600 cursor-pointer">Home</Link>
            <Link href="branch" className="hover:text-green-600 cursor-pointer">Branches</Link>
             <Link href="about" className="hover:text-green-600 cursor-pointer">About Us</Link> 
            <Menu as="div" className="relative inline-block text-left">
             <div>
                <MenuButton className="inline-flex items-center gap-1 px-2 py-1 hover:text-green-600 cursor-pointer">
                    Services
                    <ChevronDownIcon className="h-4 w-4 text-black-500" />
                </MenuButton>
             </div>
             <MenuItems className="absolute left-0 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
               <div className="py-1">
                 <MenuItem>
                    {({ active }) => (
                      <Link href="#"
                        className={`block px-4 py-2 text-sm ${
                            active ? "bg-green-100 text-green-800" : "text-black-700"}`}>
                        Ayurveda Treatment
                      </Link>
                    )}
                 </MenuItem>
                 <MenuItem>
                    {({ active }) => (
                      <Link href="#"
                        className={`block px-4 py-2 text-sm ${
                            active ? "bg-green-100 text-green-800" : "text-black-700"}`}>
                        Physiotherapy
                      </Link>
                    )}
                 </MenuItem>
                 <MenuItem>
                    {({ active }) => (
                      <Link href="#"
                        className={`block px-4 py-2 text-sm ${
                            active ? "bg-green-100 text-green-800" : "text-black-700"}`}>
                        Beauty Therapy
                      </Link>
                    )}
                 </MenuItem>
                 <MenuItem>
                    {({ active }) => (
                      <Link href="#"
                        className={`block px-4 py-2 text-sm ${
                            active ? "bg-green-100 text-green-800" : "text-black-700"}`}>
                        Massage &Yoga
                      </Link>
                    )}
                 </MenuItem>
                </div>
             </MenuItems>
            </Menu>
            <Link href="shop" className="hover:text-green-600 cursor-pointer">Shop</Link>
            <Link href="career" className="hover:text-green-600 cursor-pointer">Careers</Link>
            <Link href="#" className="hover:text-green-600 cursor-pointer">Contact us</Link>
        </nav>
      
    )
  }

