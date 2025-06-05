import React from "react";
import Image from "next/image";
import AyurvedaTable from "@/app/_components/table";
import CommonHeader from "@/app/_components/CommonHeader";

function BeautyTherapy() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center">
      <CommonHeader
        title="Ayurveda Treatment Centre Croydon, London"
        subtitle="Ayurveda and Holistic Health Centre Croydon, London"
        src="/beautyHeader.jpg"
      />
      
      {/* Introduction Section */}
      <div className="max-w-6xl w-full mx-auto mt-12 px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-emerald-800 mb-6">
          Natural Beauty Treatments
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-justify">
          Discover age-old secrets of beauty care once followed by ancient royal families of India.
          Our treatments use purely natural ingredients that nourish your skin and revitalize your spirit.
        </p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto my-8"></div>
      </div>

      {/* Introduction with Image */}
      <div className="max-w-6xl w-full mx-auto mt-6 px-4 sm:px-6 flex flex-col md:flex-row items-center md:items-start text-left gap-8">
        {/* Image Section */}
        <div className="md:w-2/5 flex justify-center">
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/beauty-treatment.jpg"
              alt="Ayurveda Beauty Treatment"
              width={500}
              height={500}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
        
        {/* Text Section */}
        <div className="md:w-3/5 mt-8 md:mt-0">
          <h2 className="text-2xl font-serif font-bold text-emerald-700 mb-4">
            Ancient Wisdom for Modern Beauty
          </h2>
          <p className="text-gray-700 mb-4 font-light leading-relaxed text-justify">
            Beauty is not in a potion or in a magic pill. Everyone is beautiful in
            his or her own way - you just need a little natural and loving touch with
            Ayurvedic care. The face is one of the important areas that you need to
            take care of because all five senses are located here. At Ayurmanthra we
            pamper you with exotic herbs, foods that are pure, and beauty care that
            is natural and simply divine.
          </p>
          <p className="text-gray-700 mb-4 font-light leading-relaxed text-justify">
            Ayurmanthra Ayurveda Beauty Clinic offers you the age-old secrets of
            beauty care which were once followed by the ancient royal families of
            India. Beauty care recipes involving various herbs, herbal extracts,
            fresh fruits, and natural products, used by Indian princesses, are no
            longer a secret and are available for you to benefit from, at our Beauty
            Clinic.
          </p>
          <p className="text-gray-700 font-light leading-relaxed text-justify">
            A natural herbal facial is a real treat for those who wish to improve
            their skin the natural way using organic herbs that have no chemicals,
            toxins, and dyes. There is a five-step facial which includes Cleansing,
            Scrubbing, Face Steaming, Face Pack, and Face Massage with Gel/Cream.
          </p>
        </div>
      </div>
      
      {/* Treatment Cards Section */}
      <div className="w-full bg-gray-50 mt-16 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-center text-emerald-800 mb-12">
            Our Signature Treatments
          </h2>
          
          {/* Treatment 1 */}
          <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-6 shadow-md">
            <div className="md:w-1/3">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/facemask.jpg"
                  alt="Herbal Beauty Facial"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-emerald-700/80 text-white text-center py-2 text-sm font-medium">
                  Natural Herbs & Extracts
                </div>
              </div>
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h3 className="text-2xl font-serif font-bold text-emerald-700 mb-3">
                MUKHA SOUNDHARY VARDHINI
              </h3>
              <h4 className="text-lg font-medium text-gray-500 italic mb-4">
                Herbal Beauty Facial
              </h4>
              <p className="text-gray-700 font-light leading-relaxed text-justify">
                Ayurvedic unique facial treatment will ensure you get the best treatment for your specific skin type. 
                The herbal ingredients gently and thoroughly cleanse skin. A regular herbal facial can help to improve 
                the beauty and health of the skin. It helps to prevent acne, oily skin, dryness, allergies, and lack of tones.
              </p>
              {/* <button className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-700 text-emerald-700 rounded-md hover:bg-emerald-700 hover:text-white transition-colors">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button> */}
            </div>
          </div>
          
          {/* Treatment 2 */}
          <div className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row-reverse items-center gap-8 bg-white rounded-xl p-6 shadow-md">
            <div className="md:w-1/3">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/Shiro Abhyanga.jpg"
                  alt="Herbal Hair Mask"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-emerald-700/80 text-white text-center py-2 text-sm font-medium">
                  Traditional Technique
                </div>
              </div>
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h3 className="text-2xl font-serif font-bold text-emerald-700 mb-3">
                KESH VARDHINI
              </h3>
              <h4 className="text-lg font-medium text-gray-500 italic mb-4">
                Herbal Hair Mask
              </h4>
              <p className="text-gray-700 font-light leading-relaxed text-justify">
                Ayurvedic hair mask is a deep conditioning treatment. They contain rich ingredients 
                such as natural oil and herbal lipids. This therapy is beneficial for stimulating hair growth, 
                soothing an itchy scalp and helps to prevent hair fall, gray hair, dryness and dandruff. 
                It also improves memory and promotes intelligence.
              </p>
              {/* <button className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-700 text-emerald-700 rounded-md hover:bg-emerald-700 hover:text-white transition-colors">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button> */}
            </div>
          </div>
          
          {/* Treatment 3 */}
          <div className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-6 shadow-md">
            <div className="md:w-1/3">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/img3.jpg"
                  alt="Herbal Body Pack & Scrub"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-emerald-700/80 text-white text-center py-2 text-sm font-medium">
                  Full Body Rejuvenation
                </div>
              </div>
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h3 className="text-2xl font-serif font-bold text-emerald-700 mb-3">
                SOUNDHARYA VARDHINI
              </h3>
              <h4 className="text-lg font-medium text-gray-500 italic mb-4">
                Herbal Body Pack & Scrub
              </h4>
              <p className="text-gray-700 font-light leading-relaxed text-justify">
                Soundharya vardhini is one of the unique relaxation therapies. It helps exfoliate and remove dead cells
                using a natural blend of special herbs and scrubs. This brings up the fresh healthy cells and makes you
                look young, healthy and attractive. It also promotes new cell growth, relieves stiffness throughout the body,
                prevents sagging of the skin, reduces wrinkles, removes toxins, revitalizes tissue and corrects skin conditions.
              </p>
              {/* <button className="mt-6 inline-flex items-center px-4 py-2 border border-emerald-700 text-emerald-700 rounded-md hover:bg-emerald-700 hover:text-white transition-colors">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Table Section */}
      <div className="max-w-6xl w-full mx-auto mt-16 px-4 sm:px-6 mb-16">
        <h2 className="text-3xl font-serif font-bold text-center text-emerald-800 mb-4">
          Treatment Pricing
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Our treatments are personalized to your unique body type and needs.
        </p>
        
        <AyurvedaTable />
        
        <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
          <p className="text-gray-700 font-light leading-relaxed  text-justify">
            Ayurvedic treatments are strictly personalized. Treatments offered for each person may vary 
            according to their conditions and body constitution. We use herbal oils, creams, and herbal 
            powders for massages and treatments depending on your body constitution and condition.
          </p>
        </div>
      </div>
     
    </section>
  );
}

export default BeautyTherapy;