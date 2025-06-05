import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AyurPot from "../../public/pot.svg";

function GoogleReview() {
  // Dummy review data
  const reviews = [
    {
      id: 1,
      text: "Absolutely amazing experience! The Abhyanga massage was exactly what I needed after a stressful week. The therapist was knowledgeable and made me feel completely relaxed. Will definitely be returning soon.",
      image: "/yoga1.jpg",
    },
    {
      id: 2,
      text: "I've tried many Ayurvedic spas, but this one stands out. The Shiro Abhyanga treatment helped with my chronic headaches and the staff was incredibly professional. The ambiance is peaceful and the oils they use smell wonderful.",
      image: "/yoga2.jpg",
    },
    {
      id: 3,
      text: "Great treatments and very knowledgeable practitioners. The Kati Abhyanga really helped with my back pain.",
      image: "/yoga3.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 relative">
      <div className="flex flex-col items-center justify-center mb-20">
        <h2 className="text-4xl font-semibold text-green-700 relative inline-block text-center  border-b-gray-200 border-b-2 py-10 w-full">
          What They Say
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.6 }}
            className="relative bg-white  border border-gray-100   rounded-xl p-6 pt-12 shadow-xl hover:shadow-2xl transition-shadow h-full "
          >
            <div className="absolute -top-8 left-6 w-20 h-20 rounded-full mb-5 border-4 border-white shadow-md overflow-hidden ">
              <Image
                src={review.image}
                width={52}
                height={52}
                alt="Reviewer"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Review content */}
            <div className="flex flex-col h-full">
              <div className="flex-1 pt-4">
                <p className="text-gray-700 text-md leading-relaxed text-left italic font-serif">
                  {review.text}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute"
        initial={{ opacity: 0, y: 50, rotate: -10 }}
        animate={{ opacity: 1, y: [50, 30, 50], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "-25%",
          left: "-15%",
        }}
      >
        <Image
          src={AyurPot}
          alt="Leaf"
          width={400}
          height={400}
          style={{
            filter:
              "invert(18%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default GoogleReview;
