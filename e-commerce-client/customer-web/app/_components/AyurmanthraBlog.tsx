"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

import AyurPot from "../../public/pot.svg";

const blogPosts = [
  {
    id: 1,
    title: "Ayurvedic Postnatal Care for Mothers at Ayur Manthra in Croydon",
    image: "/swipeImage1.jpg",
    date: "October 21, 2024",
    description: "by Ayurmanthra",
    alt: "SHIROABHYANKA - Essential To Relieve Your Stress",
  },
  {
    id: 2,
    title:
      "Ayurvedic Weight Loss Treatment: Transform Your Health with Ayur Manthra",
    image: "/swipeImage4.jpg",
    date: "October 4, 2024 ",
    description: " by Ayurmanthra",
    alt: "KATIVASTI - How to Get Rid of Your Back Pain",
  },
  {
    id: 3,
    title:
      "Rejuvenate Your Body and Mind: A Guide to Panchakarma Treatments at Ayur Manthra",
    image: "/swipeImage2.jpg",
    date: "September 21, 2024",
    description: " by Ayurmanthra",
    alt: "KIZHI TREATMENT - Epic Formula To Heal Your Mind And Body",
  },
  {
    id: 4,
    title: "Ayurvedic Detox and Weight Balance with Ayur Manthra",
    image: "/swipeImage3.jpg",
    date: "September 27, 2021",
    description: " by Sanjay Shenoi Dhanwanthari Madom",
    alt: "UDVARTANA - The Ultimate Ayurvedic Weight Loss Treatment",
  },
  {
    id: 5,
    title: "Boost Immune System Naturally Against Covid-19",
    image: "/covid.png",
    date: "September 9, 2020",
    description: " by Sanjay Shenoi Dhanwanthari Madom",
    alt: "NASYA - Ancient Treatment for Modern Sinus Problems",
  },
];

const AyurmanthraBlog = () => {
  return (
    <div className="pt-12 to-white">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-16 h-16 mb-4">
            <Image
              src="/ayurmanthra-separator.png"
              alt="Ayurmanthra Logo"
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <h1 className="text-4xl md:text-4xl text-green-700 font-semibold mb-2 ">
            Ayurmanthra Blog
          </h1>
          <p className="text-[#843041] max-w-2xl mx-auto border-b-2 border-[#843041] py-5 w-2/5">
            Ancient wisdom for modern wellness
          </p>
        </div>

        <div className="w-full relative h-20">
          <motion.div
            className="absolute"
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={{ opacity: 1, y: [50, 30, 50], rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              bottom: "-25%",
              right: "-15%",
            }}
          >
            <Image
              src={AyurPot}
              alt="Leaf"
              width={400}
              height={400}
              className=""
              style={{
                filter:
                  "invert(18%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
              }}
            />
          </motion.div>
        </div>

        <div className="relative mb-16 px-0 sm:px-4">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".blog-next",
              prevEl: ".blog-prev",
              disabledClass: "opacity-30 cursor-default",
            }}
            loop
            className="b-10"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="group rounded-xl border border-gray-100 overflow-hidden shadow-xl mb-20 h-full mx-auto flex flex-col transition-transform duration-300  hover:-translate-y-3 w-[98%] max-w-[350px]">
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-contain rounded-2xl mt-3"

                      // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-5 flex-grow flex flex-col  text-left">
                    <div>
                      <h2 className="text-md mb-3 line-clamp-2 ">
                        {post.title}
                      </h2>
                    </div>
                    <p className="text-gray-600  text-left text-sm font-semibold ">
                      {post.date}
                    </p>
                    <p className=" text-[#843041] mb-4 flex-grow text-left text-sm ">
                      {post.description}
                    </p>

                    <div className="mt-auto pt-2 border-t border-green-50">
                      <button className="text-green-600 text-sm font-medium hover:text-[#843041]">
                        Read more →
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AyurmanthraBlog;
