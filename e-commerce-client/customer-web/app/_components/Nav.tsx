"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiShoppingCart,
  FiSearch,
} from "react-icons/fi";
import { useCartList } from "../_hooks/useCartList";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Nav() {
  const { data: cart } = useCartList();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);
  const closeServices = () => setIsServicesOpen(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);
  const servicesRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    if (pathname === "/" && !isMobile) {
      const handleScroll = () => {
        const isPast100vh = window.scrollY > window.innerHeight;
        setIsScrolled(isPast100vh);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkIfMobile);
      };
    } else {
      setIsScrolled(true);
    }
  }, [pathname, isMobile]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isServicesOpen &&
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesOpen]);
  const services = [
    "Ayurveda Treatment",
    "Physiotherapy",
    "Beauty Therapy",
    "Massage and Yoga",
  ];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Branches", path: "/locations" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Shop", path: "/shop" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "Price List", path: "/price-list" },
  ];
  if (!mounted) {
    return null;
  }

  const headerClasses = [
    "sticky top-0 z-50",
    "transition-colors duration-300",
    isMobile || pathname !== "/" || isScrolled
      ? "bg-white shadow-lg"
      : "bg-transparent shadow-none",
  ]
    .filter(Boolean)
    .join(" ");

  const textColorClass =
    pathname === "/" && !isScrolled ? "text-white" : "text-gray-700";
  const hoverTextColorClass =
    pathname === "/" && !isScrolled
      ? "hover:text-emerald-600 hover:border-b-2 hover:border-emerald-600 hover:pb-1 hover:font-bold"
      : "hover:text-emerald-600 hover:border-b-2 hover:border-emerald-600 hover:pb-1 hover:font-bold";

  return (
    <header className={headerClasses}>
      <div className=" w-full">
        <div className="max-w-screen-2xl mx-auto md:px-10 ">
          {/* Top Bar */}
          <div className="flex justify-between items-center py-4 px-2 ">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="block transform hover:scale-105 transition-transform duration-200"
              >
                <Image
                  src={"/logo.png"}
                  alt="Ayur Manthra Logo"
                  width={150}
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Desktop Profile and Cart */}
            <div className="hidden md:flex items-center space-x-4">
            {isClient && user ? (
    <div className="relative">
      <button
        className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors duration-200 ${textColorClass}`}
        onClick={() => router.push("/profile")}
      >
        <FiUser className="w-5 h-5" />
      </button>
    </div>
  ) : (
    <button
      className={`px-4 py-2 rounded-md hover:bg-opacity-20 hover:bg-white transition-colors duration-200 ${textColorClass}`}
      onClick={() => router.push("/login")}
    >
      Sign in
    </button>
  )}
              <Link
                href="/cart"
                className={`relative p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors duration-200 ${textColorClass}`}
              >
                <FiShoppingCart className="w-5 h-5" />
                <span
                  className={`absolute -top-1 -right-1 ${
                    pathname === "/" && !isScrolled
                      ? "bg-white text-green-600"
                      : "bg-green-600 text-white"
                  } text-sm rounded-full w-5 h-5 flex items-center justify-center`}
                >
                  {cart?.total ?? 0}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Link href="/cart" className={`relative p-2 ${textColorClass}`}>
                <FiShoppingCart className="w-5 h-5" />
                <span
                  className={`absolute -top-1 -right-1 ${
                    pathname === "/" && !isScrolled
                      ? "bg-white text-green-600"
                      : "bg-green-600 text-white"
                  } text-sm rounded-full w-5 h-5 flex items-center justify-center`}
                >
                  {cart?.total ?? 0}
                </span>
              </Link>
              <button
                className={`p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors duration-200 ${textColorClass}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:block border-t ${
              pathname === "/" && !isScrolled
                ? "border-opacity-20 border-white"
                : "border-gray-100"
            }`}
          >
            <ul className="flex justify-center items-center space-x-10 py-3 ">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  {item.name === "Services" ? (
                    <div ref={servicesRef}>
                      <button
                        onClick={toggleServices}
                        className={`flex items-center text-md font-medium ${
                          pathname === item.path
                            ? "text-emerald-600"
                            : textColorClass
                        } ${hoverTextColorClass} transition-colors duration-200 group`}
                      >
                        {item.name}
                        <FiChevronDown className="ml-1 group-hover:transform group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                      {isServicesOpen && (
                        <ul className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 transition-all duration-200">
                          {services.map((service) => (
                            <li key={service} className="hover:bg-gray-50">
                              <Link
                                href={`/services/${service
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="block px-4 py-3 text-md text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                                onClick={closeServices}
                              >
                                {service}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      onClick={closeServices}
                      href={item.path}
                      className={`text-md font-medium ${
                        pathname === item.path
                          ? "text-emerald-600"
                          : textColorClass
                      } ${hoverTextColorClass} transition-colors duration-200`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav
              className={`md:hidden ${
                pathname === "/" && !isScrolled
                  ? "bg-black bg-opacity-90"
                  : "bg-white"
              } border-t ${
                pathname === "/" && !isScrolled
                  ? "border-opacity-20 border-white"
                  : "border-gray-100"
              }`}
            >
              <div className="px-4 py-2">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full px-4 py-2 rounded-lg ${
                      pathname === "/" && !isScrolled
                        ? "bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border-white border-opacity-30"
                        : "border border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent`}
                  />
                  <FiSearch
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      pathname === "/" && !isScrolled
                        ? "text-white text-opacity-70"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name} className="relative">
                      {item.name === "Services" ? (
                        <>
                          <button
                            onClick={toggleServices}
                            className={`flex items-center w-full px-2 py-2 text-sm font-medium ${
                              pathname === item.path
                                ? "text-emerald-600"
                                : textColorClass
                            } ${hoverTextColorClass} transition-colors duration-200`}
                          >
                            {item.name}
                            <FiChevronDown
                              className={`ml-1 transition-transform duration-200 ${
                                isServicesOpen ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isServicesOpen && (
                            <ul className="pl-4 mt-1 space-y-2">
                              {services.map((service) => (
                                <li key={service}>
                                  <Link
                                    href={`/services/${service
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                    className={`block py-2 text-sm ${
                                      pathname === "/" && !isScrolled
                                        ? "text-white text-opacity-80 hover:text-white"
                                        : "text-gray-600 hover:text-emerald-600"
                                    } transition-colors duration-200`}
                                    onClick={() => {
                                      closeServices();
                                      closeMenu();
                                    }}
                                  >
                                    {service}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.path}
                          className={`block px-2 py-2 text-sm font-medium ${
                            pathname === item.path
                              ? "text-emerald-600"
                              : textColorClass
                          } ${hoverTextColorClass} transition-colors duration-200`}
                          onClick={() => {
                            closeServices();
                            closeMenu();
                          }}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                  {/* Mobile Profile Dropdown */}
                  {isClient && user && (
                    <li className="relative">
                      <button
                        onClick={() => {
                          router.push("/profile");
                          closeMenu();
                        }}
                        className={`flex items-center w-full px-2 py-2 text-sm font-medium ${textColorClass} ${hoverTextColorClass} transition-colors duration-200`}
                      >
                        Profile
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
