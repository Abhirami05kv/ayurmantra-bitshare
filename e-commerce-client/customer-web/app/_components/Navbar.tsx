"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiPhone, FiMail, FiHelpCircle, FiGrid } from "react-icons/fi";

interface Props {
  children?: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    if (!isMobile) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (containerRef.current) {
          containerRef.current.style.transform =
            currentScrollY > 50 ? "translateY(-100%)" : "translateY(0)";
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkIfMobile);
      };
    }
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out shadow-md z-40" // Lower z-index than Nav
    >
      {children}
    </div>
  );
}

export default function Navbar() {
  return (
    <>
      <HideOnScroll>
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-1 md:py-2">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-6 md:text-sm  text-xs text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-2 md:gap-x-6 gap-y-1 mb-1 md:mb-0">
              <a
                href="tel:02036206999"
                className="flex items-center space-x-1 hover:text-gray-200 transition"
              >
                <FiPhone className="text-sm md:text-base" />
                <span>0203 6206 999</span>
              </a>
              <a
                href="mailto:info@ayurmanthra.co.uk"
                className="flex items-center space-x-1 hover:text-gray-200 transition"
              >
                <FiMail className="text-sm md:text-base" />
                <span>info@ayurmanthra.co.uk</span>
              </a>
            </div>

            <div className="flex gap-x-2 md:gap-x-4">
              <Link
                href="/gallery"
                className="flex items-center space-x-1 hover:text-gray-200 transition"
              >
                <FiGrid className="text-sm md:text-base" />
                <span>Gallery</span>
              </Link>
              <Link
                href="/faq"
                className="flex items-center space-x-1 hover:text-gray-200 transition"
              >
                <FiHelpCircle className="text-sm md:text-base" />
                <span>FAQ</span>
              </Link>
            </div>
          </div>
        </div>
      </HideOnScroll>

      <div className="h-12 md:h-10"></div>
    </>
  );
}
