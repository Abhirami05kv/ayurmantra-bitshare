import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Ourservices() {
  const services = [
    {
      title: "Abhyanga",
      subtitle: "(FULL BODY OIL MASSAGE)",
      image: "/abhyanga.jpg",
      description: "Abhyanga is a traditional Ayurvedic herbal oil massage. The goal of the abhyanga is to relax the body and mind which also improves flow of energy level, relieves stress, anxiety and depression.",
    },
    {
      title: "Shiro Abhyanga",
      subtitle: "(Indian Head Massage)",
      image: "/Shiro Abhyanga.jpg",
      description: "Abhyanga is a traditional Ayurvedic herbal oil massage. It relaxes the body and mind, improves energy flow, relieves stress, anxiety, and depression.",
    },
    {
      title: "Kati Abhyanga",
      subtitle: "(Back Massage)",
      image: "/ayurveda-massage.jpg",
      description: "A special oil massage for the back, shoulder, and neck. This treatment helps reduce muscle pain, stiffness, arthritis, spondylosis, sciatica, and spinal disorders.",
    },
    {
      title: "Pad Abhyanga",
      subtitle: "(Foot Massage)",
      image: "/leg_massage.jpg",
      description: "A therapeutic foot massage that improves circulation, relieves tension, and promotes overall relaxation and wellbeing.",
    },
    {
      title: "KIZHI",
      subtitle: "(HOT BAG MASSAGE)",
      image: "/kizhi.jpg", 
      description: "Kizhi treatment is one of the most effective therapies in Ayurveda. Heated herbs and medicinal oil tied in cloth bags are kept on the treated area",
    },
  ];

  return (
    <section className="relative py-10 px-4 md:px-12 overflow-hidden text-center md:flex md:items-center md:justify-between">
      <Image
        src={"/ayurvedic.svg"}
        alt="Leafy Background"
        fill
        className="absolute top-0 left-0 opacity-10 pointer-events-none w-full object-cover"
        style={{
          filter:
            "invert(38%) sepia(85%) saturate(706%) hue-rotate(78deg) brightness(90%) contrast(91%)",
        }}
      />

      <section className="mx-auto text-center w-full">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-center text-green-800">
            Our Ayurvedic Services
          </h1>
          <h3 className="text-xl text-[#843041] mb-24 text-center border-b-2 border-[#843041] pb-5 w-2/3 mx-auto">
            Ancient treatments for rejuvenation, relaxation and holistic wellness.
          </h3>

          {/* Swiper Carousel */}
          <div className="px-4 pb-12">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
             
              navigation={false}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay]}
              
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="group relative bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out w-full overflow-hidden border-t-4 border-green-500 h-[450px] mx-auto">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                      <div className="text-xl font-semibold text-white mb-2 text-center">
                        {service.title}
                        <span className="block text-sm text-green-100 mt-1">
                          {service.subtitle}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-white text-sm text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out mb-4">
                        {service.description}
                      </p>

                      {/* Button */}
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <CustomButton href="/services/ayurveda-treatment">
                          Discover More
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-4">
          <CustomButton href="/services/ayurveda-treatment">
            Our Ayurveda Treatments
          </CustomButton>
          <CustomButton href="/price-list">View Our Price List</CustomButton>
        </div>
      </section>
    </section>
  );
}

export default Ourservices;