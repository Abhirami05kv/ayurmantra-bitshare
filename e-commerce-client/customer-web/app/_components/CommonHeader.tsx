import Image from "next/image";
import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  src?: string; 
}

function CommonHeader({ title, subtitle, src = "/ayurmanthra-title.jpg" }: HeaderProps) {
  return (
    <section className="relative w-full h-[300px] z-10">
      {/* Background Image */}
      <Image
        src={src} 
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        loading="lazy"
      />

      {/* Text Container */}
      <div className="absolute inset-0 flex items-center px-8 sm:px-14 md:px-20 lg:px-28">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug max-w-xl">
          {title}
          {subtitle && (
            <span className="text-base font-light block mt-3 opacity-90">
              {subtitle}
            </span>
          )}
        </h1>
      </div>
    </section>
  );
}

export default CommonHeader;