import Image from "next/image";
import { motion } from "framer-motion";

const certifications = [
  { logo: "/apa_logo.jpg", alt: "APA Certification" },
  { logo: "/fht_logo.jpg", alt: "FHT Certification" },
  { logo: "/ctha_logo.jpg", alt: "CTHA Certification" },
];

const Certificates = () => {
  return (
    <section className="flex flex-col my-36">
      <div className="w-full relative h-20">
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
            top: 0,
            left: "20%",
          }}
        >
          <Image
            src={"/ayur-pot-1.png"}
            alt="Leaf"
            width={100}
            height={200}
            className=""
          />
        </motion.div>
      </div>
      <section className="mb-12 py-8 mx-auto px-6 ">
        <p className="text-green-700 font-serif italic text-2xl">
          &quot;All our Ayurvedic practitioners and therapists are active
          members of&quot;
        </p>
      </section>

      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 max-w-[350px] sm:max-w-[80%] mx-auto py-8 ">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative group"
          >
            <div className="relative w-44 h-44 overflow-hidden rounded-full border-2 border-gray-100 ">
              <Image
                src={cert.logo}
                alt={cert.alt}
                fill
                className="object-contain p-4 transition-transform duration-500 ease-in-out group-hover:scale-110"
              />

              <div className="absolute inset-0 border-4 border-transparent rounded-full group-hover:border-green-300 transition-all duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
            </div>

            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-green-700 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg min-w-max">
              {cert.alt}

              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-green-700"></div>
            </div>
          </div>
        ))}
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
            bottom: 0,
            right: "20%",
          }}
        >
          <Image
            src={"/ayur-pot-1.png"}
            alt="Leaf"
            width={100}
            height={200}
            className=""
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
