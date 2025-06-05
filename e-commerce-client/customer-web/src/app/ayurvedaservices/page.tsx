import React from 'react';
import Image from 'next/image';


const AyurvedaServices = () => {
  return (
    <>
    <div className="max-w-screen mx-auto px-4 py-12 bg-[#DEEED9]">
      {/* Heading at the top */}
      <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium mt-4">
        Best Ayurvedic Massage Centre in Croydon, London
      </h1>

      <div className="relative w-full h-64 md:h-130 mb-8 rounded-lg overflow-hidden mt-14">
        <Image
          src="/images/ayurvedalondon.webp" 
          alt="Ayurmanthra Ayurvedic Treatment Center"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
        />
      </div>
      

      {/* Text content below heading */}
      <div style={{ fontFamily: "'Onest', sans-serif" }} className=" space-y-6 mt-8 text-justify">
        <p>
          Ayurmanthra is Authentic ayurvedic treatment centre in Croydon and Epsom, London. 
          The distinguished ayurvedic health centre offers congenial surrounding for the 
          powerful cures of the most revered, timeless healing tradition – Ayurveda, to work 
          its magic on your mind, body and spirit. The healing methods employ time proven 
          strategies and the finest Ayurveda treatment in Kerala; to effect fast, yet lasting 
          cure. Our friendly team of eminent Ayurvedic doctors will meet with you regularly to 
          share your thoughts and discuss your progress, making your healing experience seamless 
          and enjoyable.
        </p>
        
        <p>
          At Ayurmanthra Ayurvedic Treatment Centre Croydon and Epsom, our focus is on authentic 
          Ayurveda rather than just wellness. Every guest's treatment plan is responsibly 
          selected and customized to his or her specific needs. The Ayurmanthra Ayurvedic 
          Massage Centre London, UK is a place of retreat for anyone seeking a genuine holistic 
          experience for the well-being of the body and mind, With a focus on authentic Ayurveda 
          combine with today's possibilities of medical science, the medical center offers an 
          alternative to Western medicine.
        </p>
        
        <p>
          Ayurmanthra, the best ayurveda massage centre London offers various types of Ayurvedic 
          treatment, to both inpatients and outpatients. Apart from regular treatment for 
          routine ailments as well as chronic diseases, Ayurmanthra also offers a host of 
          specialized therapeutic treatments to maintain good health. At Ayurmanthra, the 
          ayurvedic therapeutic programs are directed towards curing not just the symptoms of 
          the disease but the basic health problems or imbalances.
        </p>

        <p>
            The approach in Ayurveda is preventive and tries to cure the ailment not the 
            symptoms. Ayurveda considers indigestion to be the root cause of almost all the 
            diseases. So proper management of digestive impairment in the initial stage itself 
            prevents the onset of many other major illnesses in later stages of life.
        </p>
      </div>
    {/* </div> */}
    
     {/* Treatment Section */}
      <div className="max-w-7xl mx-auto px-4 mb-12 mt-8">
        <div className=" p-8 rounded-lg space-y-12">

            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                        src="/images/abhyangamassage.jpg"
                        alt="Abhyanga Massage"
                        fill
                        className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
                    ABHYANGA (FULL BODY OIL MASSAGE)
                </h2>
                <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-4 text-justify">
                    Abhyanga is a traditional Ayurvedic herbal oil massage. The goal of the 
                    abhyanga is to relax the body and mind which also improves flow of energy 
                    level, relives stress, anxiety and depression. It helps to improve blood 
                    circulation, muscle pain, and relives symptoms of rheumatism and maintains 
                    balanced health.
                </p>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-lg">Price: 60 Min - £72</p>
                    <p className="font-semibold text-lg">Price: 90 Min - £108</p>
                </div>
            </div>
        </div>

         {/* Shirodhara Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/shirodhara.jpg"
                  alt="Shirodhara Treatment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4 ">
                SHIRODHARA (OIL STREAM THERAPY)
              </h2>
              <p style={{ fontFamily: "'Onest', sans-serif" }} className="mb-4 text-justify">
                Shirodhara involves gently pouring warm herbal oil in a continuous stream on 
                the forehead. This deeply relaxing treatment calms the nervous system, relieves 
                stress and anxiety, improves sleep quality, and enhances mental clarity. It's 
                particularly beneficial for those suffering from insomnia, migraines, or 
                chronic stress.
              </p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-lg">Price: 60 Min - £84</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/kizhi.jpg"
                  alt="Kizhi Treatment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
                KIZHI (HOT BAG MASSAGE)
              </h2>
              <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-4 text-justify">
                Kizhi treatment is one of the most effective therapies in Ayurveda. Heated herbs 
                and medicinal oil tied in cloth bags first and kept in the area that is t be 
                treated. Kizhi is useful for osteoarthritis spondylosis, muscular crumps, 
                obesity, swelling, sports injuries sciatica etc…
              </p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-lg">Price: 30 Min - £48</p>
              </div>
            </div>
          </div>

           <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/shiroabhyanga.jpg"
                  alt="Shiro Abhyanga Treatment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4">
                SHIRO ABHAYANGA (INDIAN HEAD MASSAGE)
              </h2>
              <p style={{ fontFamily: "'Onest', sans-serif" }} className=" mb-4 text-justify">
                This treatment is very beneficial for people who suffer from headache, 
                migraine, insomnia, stress and mental disorders. It involves head, neck and 
                shoulder massage using medicated oil which stimulates hair growth and prevents 
                hair graying.
              </p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-lg">Price: 30 Min - £48</p>
              </div>
            </div>
          </div>

          {/* Kati Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/kativasthi.webp"
                  alt="Kati Vasthi Treatment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium mb-4 ">
                KATI VASTHI (HERBAL OIL POOLING)
              </h2>
              <p style={{ fontFamily: "'Onest', sans-serif" }} className="mb-4 text-justify">
                Kati vasthi is an Ayurvedic lambo – sacral rejuvenation thrapy. The healing 
                properties of hot herbal oil used for this therapy which  deeply cleanses and 
                enrich blood, build and maintain strong muscles and connective tissues and 
                lubricate the joints keeping them flexible and pain free. It also good for back, 
                neck, knees, and stomach and very useful for back pain, sciatica, osteoarthritis, 
                stiffness etc.
              </p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-lg">Price: 30 Min - £48</p>
              </div>
            </div>
          </div>


          
          <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-tr-3xl rounded-bl-3xl">
            <h1  className="text-[#7FB53D] text-xl italic font-medium">
                Ayur Manthra’s VIP Fusion Therapies
            </h1>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className='mt-4 text-justify'>Ayur Manthra’s tailored treatment therapies combining 2 or more therapies into a single 
                session to meet your unique well being needs. These longer sessions are ideal for those 
                who feel they don’t get enough from the standard sessions or may want to fuse more than two
                therapies into one longer session.
            </p>
            <h1  className="text-[#7FB53D] text-xl italic font-medium mt-6">
                Popular Fusion therapies are :
            </h1>
            <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="font-bold text-lg mb-2 mt-4">CODE : AFT101</h3>
            <div style={{ fontFamily: "'Onest', sans-serif" }} className='flex justify-between item-center'>
                <p className="mb-3">
                Full body massage + Indian Head Massage + Steam
                </p>
                <p className="font-medium" >120 minutes – £144</p>
            </div>

            <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="font-bold text-lg mb-2 mt-4">CODE : AFT102</h3>
            <div style={{ fontFamily: "'Onest', sans-serif" }} className='flex justify-between item-center'>
                <p className="mb-3">
                Full Body Massage + Indian Head Massage + Shiro Dhara + steam 
                </p>
                <p className="font-medium" >150 minutes – £180</p>
            </div>

            <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="font-bold text-lg mb-2 mt-4">CODE : AFT103</h3>
            <div style={{ fontFamily: "'Onest', sans-serif" }} className='flex justify-between item-center'>
                <p className="mb-3">
                ndian Head Massage + Foot Massage + Neck & shoulder massage + Face Massage / back massage
                </p>
                <p className="font-medium" >120 minutes – £144</p>
            </div>

            <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="font-bold text-lg mb-2 mt-4">CODE : AFT104</h3>
            <div style={{ fontFamily: "'Onest', sans-serif" }} className='flex justify-between item-center'>
                <p className="mb-3">
                Full Body Massage + Indian Head Massage + Shiro Dhara + Herbal Facial + Steam  
                </p>
                <p className="font-medium" >210 minutes – £264</p>
            </div>

            <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="font-bold text-lg mb-2 mt-4">CODE : AFT105</h3>
            <div style={{ fontFamily: "'Onest', sans-serif" }} className='flex justify-between item-center'>
                <p className="mb-3">
                Full Body Massage + Indian Head Massage + Herbal Facial + Steam 
                </p>
                <p className="font-medium" >120 minutes – £180</p>
            </div>

            <h1  className="text-[#7FB53D] text-xl italic font-medium mt-6">
                Packages and Offers
            </h1>
            <p style={{ fontFamily: "'Onest', sans-serif" }} className='mt-4 text-justify'>
                We offer discounted rates in bulk buying of our sessions only for those who 
                need treatment . Packages and offers changes accordingly time to time and it is 
                offered purely by the discretion of the management. Always check at the
                 reception for more details.
            </p>

          </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default AyurvedaServices;