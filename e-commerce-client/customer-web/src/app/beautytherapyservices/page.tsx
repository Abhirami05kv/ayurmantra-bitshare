import React from 'react'
import Image from 'next/image'


const facialServices = [
  { type: "HERBAL FACIAL", time: "60 MIN", rate: "£66" },
  { type: "NEEM FACIAL", time: "60 MIN", rate: "£66" },
  { type: "BANANA FACIAL", time: "60 MIN", rate: "£66" },
  { type: "PAPAYA FACIAL", time: "60 MIN", rate: "£66" },
  { type: "SAFFRON FACIAL", time: "60 MIN", rate: "£66" },
  { type: "PEARL FACIAL", time: "60 MIN", rate: "£66" },
  { type: "GOLD FACIAL", time: "60 MIN", rate: "£66" },
  { type: "PLATINUM FACIAL", time: "60 MIN", rate: "£66" },
];

const BeautyTherapy = () => {
  return (
    <div className="max-w-screen mx-auto px-4 py-12 bg-[#DEEED9]">
      {/* Heading at the top */}
      <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium">
        Beauty Therapy Croydon, London
      </h1>

      
        {/* IMAGE BANNER WITH TEXT OVERLAY */}
        <div className="relative mt-6 w-full h-[500px] rounded-xl overflow-hidden shadow-md">
        <Image
            src="/images/beautytherapy.jpg"
            alt="Facial Banner"
            fill
            className="object-cover"
            priority
        />
        </div>
        <h2 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-xl font-medium italic mt-6">
            Reveal Your Natural Glow
        </h2>
        <p style={{ fontFamily: "'Onest', sans-serif" }} className="text-justify mt-2 text-lg">
            Beauty is not in a potion or in a magic pill. Everyone is beautiful in his or 
            her own way – you just need a little natural and loving touch with Ayurvedic care. 
            The face is one of the important areas that you need to take care of because all 
            five senses are located here. At Ayurmanthra we pamper you with exotic herbs, foods 
            that are pure, and beauty care that is natural and simply divine.
            Ayurmanthra Ayurveda Beauty Clinic offers you the age old secrets of beauty care 
            which were once followed by the ancient royal families of India. Beauty care 
            recipes involving various herbs, herbal extracts, fresh fruits and natural products, 
            used by Indian princesses, are no longer a secret and are available for you to benefit 
            from, at our Beauty Clinic.
            Natural herbal facial is a real treat for those who wish to improve their skin. 
            the natural way using organic herbs that have no chemicals, toxins and dyes. There 
            is a live-step facial which includes Cleansing, Scrubbing, Face Steaming, Face Pack 
            and Face Massage with Gel/Cream.
        </p>
        

       <div className="flex flex-col md:flex-row gap-8 items-center mt-16 ">
            <div className="md:w-1/2">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/beauty1.jpg"
                        alt="Facial"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="md:w-1/2">
                <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
                    MUKHA SOUNDHARY VARDHINI (HERBAL BEAUTY FACIAL)
                </h2>
                <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-4 text-justify">
                    Ayrvrdic unique facial treatment will ensure you get the best treatment for 
                    your specific skin type. The herbal ingredients gently and thoroughly 
                    cleanse skin. A regular herbal facial can help to improve the beauty and 
                    health of the skin. It helps to prevent the acne, oily skin, dryness, 
                    allergies, and lack of tones.
                </p>
            </div>
        </div>

         <div className="flex flex-col md:flex-row gap-8 items-center mt-6">
            <div className="md:w-1/2">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/beauty2.webp"
                        alt="Hair"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="md:w-1/2">
                <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
                    KESH VARDHINI (HERBAL HAIR MASK)
                </h2>
                <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-4 text-justify">
                    Ayurvedic hair mask is a deep conditioning treatment. They contain reach ingredients 
                    such as natural oil and herbal lipids. This therapy beneficial for stimulates hair 
                    growth, soothes an itchy scalp and helps to prevent hair fall, gray hair, dryness and 
                    dandruff also improves memory and promotes intelligent.
                </p>
            </div>
        </div>

         <div className="flex flex-col md:flex-row gap-8 items-center mt-6">
            <div className="md:w-1/2">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/beauty3.jpg"
                        alt="Body"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="md:w-1/2">
                <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
                    SOUNDHARYA VARDHINI (HERBAL BODY PACK &SCRUB)
                </h2>
                <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-4 text-justify">
                    Soundharya vardhini is one of the unique relaxation therapy. Helps exfoliate and 
                    remove dead cells. Using a natural blend of special herbs and scrubs. This brings 
                    up the fresh healthy cell and makes you     look young healthy and attractive also 
                    promotes new cell growth, reliving stiffness throughout the body prevent sagging 
                    of the skin, reduce wrinkles, remove toxins, revitalize tissue and correct skin 
                    conditions.
                </p>
            </div>
        </div>
        <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-xl italic font-medium mt-14">
            Facial Services & Rates
        </h1>
        <div className="space-y-4 mt-4">
        {facialServices.map((item, index) => (
          <div
            style={{ fontFamily: "'Onest', sans-serif" }}
            key={index}
            className="flex justify-between items-center bg-white px-6 py-4 shadow-sm border rounded-tr-2xl rounded-bl-2xl"
          >
            <span className="font-semibold w-1/3">{item.type}</span>
            <span className="w-1/3 text-center">{item.time}</span>
            <span className="w-1/3 text-right font-medium">{item.rate}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "'Onest', sans-serif" }} className='mt-8'>Ayurvedic treatments are strictly personalised. Treatments offered for each person may 
        vary according to their conditions and body constitution. We use herbal oils, creams, 
        herbal powders for massages and treatments depending on your body constitution and condition.
      </p>
    </div>
  )
}

export default BeautyTherapy;