// app/consultation/page.tsx
import Image from "next/image";

export default function ConsultationPage() {
  return (
    <div className="bg-white px-6 py-12">
      <h2 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-lg italic text-left mb-8">
        Consultation</h2>

      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 -ml-12">
          <Image
            src="/images/ayurvedaspa.jpg" 
            alt="Consultation"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
            Understanding Your Dosha: Vata, Pitta, and Kapha</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ayurveda identifies three basic types of energy or functional principles
            that are present in everyone and everything. We use the original Sanskrit words 
            “Vata, Pitta and Kapha.” The principle can be related to the basic biology of the 
            human body. We offer consultation with our Ayurvedic Doctor.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Ayurvedic consultant will perform an assessment of your health and provide treatment 
            and medicinal recommendations, also a personalized diet and lifestyle plan.
          </p>
          <button className="mt-4 bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
