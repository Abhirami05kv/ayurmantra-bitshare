import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";

function Consultation() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  // from-[#843041] to-[#ae364e]
  return (
    <section className="flex flex-col justify-center">
      <motion.h1
        initial={{ x: "4%" }}
        whileInView={{ x: "0" }}
        exit={{ x: "-4%" }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-4xl  font-bold mb-6 text-centerrounded-md text-green-700 py-5  mx-auto"
      >
        Ayurvedic Consultation
      </motion.h1>

      <section className="bg-gradient-to-b from-white to-green-50  text-center md:flex md:items-center md:justify-between py-20 px-4 md:px-12">
        <motion.div
          className=" md:w-1/2 flex justify-start mb-6 md:mb-0 px-4"
          initial={{ x: "-4%" }}
          whileInView={{ x: "0" }}
          exit={{ x: "4%" }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/massage.jpg"
            alt="Ayurvedic Massage"
            width={500}
            height={900}
            className="object-coverrounded-full shadow-2xl border-4 border-white/20 w-full h-[700px]"
          />
        </motion.div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left px-8 ">
          <motion.p
            className="text-base md:text-lg leading-relaxed mb-8 text-justify"
            initial={{ y: "50%" }}
            whileInView={{ y: "0" }}
            exit={{ y: "-50%" }}
            transition={{ duration: 1 }}
          >
            Ayurveda, the ancient system of natural healing, is rooted in the
            understanding that every individual is unique. It revolves around
            three fundamental energies known as Doshas – Vata, Pitta, and Kapha
            – which govern the physical and emotional characteristics of each
            person. An Ayurvedic consultation involves an in-depth analysis of
            your body constitution (Prakriti), current imbalances (Vikriti),
            lifestyle, diet, and mental health. Through careful observation,
            pulse diagnosis, and personalized discussion, the practitioner
            identifies which doshas may be out of balance and recommends natural
            methods to restore harmony.
          </motion.p>
          <motion.div
            className="space-y-4 mt-6 mb-20"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-lg"
            >
              <span className="text-green-600">✓</span>
              <span className="text-gray-500 font-semibold  text-base md:text-lg">
                Herbal remedies
              </span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center  gap-3 rounded-full px-4 py-3 shadow-lg "
            >
              <span className="mt-1 text-green-600">✓</span>
              <span className="text-gray-500 font-semibold  text-base md:text-lg">
                Detox routines (Panchakarma)
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center  gap-3 rounded-full px-4 py-3 shadow-lg "
            >
              <span className="mt-1 text-green-600">✓</span>
              <span className="text-gray-500 font-semibold  text-base md:text-lg">
                Dietary changes tailored to your dosha
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center  gap-3 rounded-full px-4 py-3 shadow-lg "
            >
              <span className="mt-1 text-green-600">✓</span>
              <span className="text-gray-500 font-semibold text-base md:text-lg">
                Daily routines (Dinacharya)
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 rounded-full px-4 py-3 shadow-lg "
            >
              <span className="mt-1 text-green-600 ">✓</span>
              <span className="text-gray-500 font-semibold  text-base md:text-lg">
                Yoga and meditation practices
              </span>
            </motion.div>
          </motion.div>

          <div className="w-full flex justify-center">
            {" "}
            <CustomButton href="/contact">Contact Us</CustomButton>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Consultation;
