"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function ConsultationPage() {

  const router = useRouter(); // Initialize router
  
    const handleRedirect = () => {
    router.push("about");
    };

  return (
    <div className="max-w-screen mx-auto px-4 py-12 bg-gray-50">
      <div className=" max-w-7xl mx-auto overflow-visible flex flex-col md:flex-row">
        {/* Left Text Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 p-8 md:p-12 bg-white relative z-10 ml-4 rounded-tl-[150px]"
          style={{
            boxShadow:
              "-10px 0px 15px rgba(0,0,0,0.08), 0px -10px 15px rgba(0,0,0,0.08), 0px 10px 15px rgba(0,0,0,0.08)",
          }}
        >
        {/* <div className="w-full md:w-1/2 p-8 md:p-12 bg-white relative z-10 ml-4 rounded-tl-[150px] "
          style={{
          boxShadow: "-10px 0px 15px rgba(0,0,0,0.08), 0px -10px 15px rgba(0,0,0,0.08), 0px 10px 15px rgba(0,0,0,0.08)",
        }}
        > */}
          <p style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-xl italic mb-2 mt-8">Consultation</p>
          <h1 className="text-4xl md:text-5xl font-medium leading-snug text-gray-800" style={{ fontFamily: "'Onest', sans-serif" }}>
            Understanding Your Dosha: Vata, Pitta, and Kapha
          </h1>
          <p className="text-gray-500 mt-4 text-justify">
            Ayurveda identifies three basic types of energy or functional principles
            that are present in everyone and everything. We use the original Sanskrit words 
            “Vata, Pitta and Kapha.” The principle can be related to the basic biology of the 
            human body. We offer consultation with our Ayurvedic Doctor.
          </p>
          <p className="text-gray-500 mt-4 text-justify">
            The Ayurvedic consultant will perform an assessment of your health and provide treatment 
            and medicinal recommendations, also a personalized diet and lifestyle plan.
          </p>
          <button 
            onClick={handleRedirect}
            className="mt-4 bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
            Contact Us
          </button>
        </motion.div>
        {/* </div> */}
        

        {/* Right Image Section */}
        {/* <div className="w-1/2 relative "> */}
         <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 relative"
        >
          <Image
            src="/images/ayurvedaspa.jpg"
            alt="Ayurveda Therapy"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
          </motion.div> 
        {/* </div> */}
      </div>
    </div>
  );
}




