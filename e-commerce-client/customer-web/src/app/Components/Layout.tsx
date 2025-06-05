'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../Components/Header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setShowHeader(true);
      return;
    }

    const handleScroll = () => {
      setShowHeader(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <div className="flex-grow -mt-4">
        {children}
      </div>
    </div>
  );
}
