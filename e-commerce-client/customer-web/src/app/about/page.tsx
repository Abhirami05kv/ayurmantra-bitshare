import React from 'react'
import Image from 'next/image';
import { FaBullseye, FaGlobe, FaMugHot } from 'react-icons/fa';

export default function About () {
  return (
   <>
    <section className="bg-white py-16 px-6 md:px-0">
      {/* <Header /> */}
      
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column */}
          <div className="flex-1">
            <h6
                style={{ fontFamily: "Libre Baskerville" }}
                className="text-[#7FB53D] italic mb-4 text-lg ml-16">About Us
            </h6>
            <h1 style={{ fontFamily: "'Onest', sans-serif" }}
                className="text-4xl text-gray-900 mb-4 ml-16">
                Authentic Ayurveda <br /> Treatment Centre <br/> Croydon and Epsom, London
            </h1>
            <hr className="w-100 border-t-2 border-gray-200 mb-4 ml-16" />
            <p className="text-gray-600 mb-6 ml-16 text-justify">
                A warm welcome awaits you at Ayurmanthra. An Authentic traditional Ayurvedic 
                treatment center at Croydon and Epsom. In “Sanskrit” Ayurmanthra mean’s 
                “LIFE WELL-BEING ENERGY”. Ayurmanthra Ayurveda follows a holistic curative 
                methodology aimed at finding the root-cause of the disease and healing it.
            </p>
            <button className="ml-16 bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
                Learn more
            </button>
          </div>
             {/* Center Image */}
            <div className="flex-1 relative">
                <div className="overflow-hidden rounded-tl-[120px] shadow-md w-[300px] h-[400px] relative">
                    <Image
                    src="/images/ayurveda.jpg"
                    alt="Ayurvedic Ingredients"
                    fill
                    className="object-cover"
                    />
                </div>
                <div className="absolute bottom-[-30px] rounded-br-[60px] 
                    left-[40%] bg-[#7FB53D] text-white px-6 py-4 shadow-2xl h-[200px] flex 
                    flex-col items-center justify-start pt-16">
                    <h3 className="text-5xl font-medium leading-tight">25+</h3>
                    <p style={{ fontFamily: "Libre Baskerville" }} className="text-sm italic">Years of Experience</p>
                </div>
            </div>
              {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6">
            {[
                {
                icon: <FaBullseye className="text-2xl" />,
                title: 'Our Vision',
                desc: 'Auctor elementum etiam congue gravida posuere nostra inceptos scelerisque mus consequat imperdiet.',
                },
                {
                icon: <FaGlobe className="text-2xl" />,
                title: 'Our Mission',
                desc: 'Auctor elementum etiam congue gravida posuere nostra inceptos scelerisque mus consequat imperdiet.',
                },
                {
                icon: <FaMugHot className="text-2xl" />,
                title: 'Our Motto',
                desc: 'Auctor elementum etiam congue gravida posuere nostra inceptos scelerisque mus consequat imperdiet.',
                },
            ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                <div className="bg-[#E68449] text-white p-3 rounded-tl-[20px]">{item.icon}</div>
                <div>
                    <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                </div>
            ))}
            </div>
      </div>
    </section>  
    <section 
        className="relative w-full h-[100vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/herblpowder.jpg')" }} >
      <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className=" flex flex-col justify-center items-center max-w-2xl min-h-[400px] rounded-md border border-white/30">
            <h1 style={{ fontFamily: "'Onest', sans-serif" }} className="text-4xl font-medium mb-4">
              How I Discovered <br /> Ayurveda
            </h1>
            <p className="text-base md:text-lg mb-6 text-gray-200">
              I have always been fascinated by medical healing systems and the research that 
              goes along with it. Thus, the idea that stuck with me during my teens was to be a 
              scientist.
            </p>
            {/* <button className="bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
               Discover more
            </button> */}
          </div>
        </div>
        <div className="absolute left-6 -bottom-10 bg-[#7FB53D] text-white rounded-tl-[50px] px-10 
          py-6  w-[95%] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-4 bold-medium">
            {[
              { value: "91K+", label: "Project Done" },
              { value: "84K+", label: "Happy Clients" },
              { value: "42+", label: "Company Support" },
              { value: "4.7", label: "Client Reviews" },
            ].map((stat, idx) => (
              <div key={idx}  className={`flex flex-col items-center ${
                idx !== 0 ? 'border-l border-white' : ''
              }`}>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="mt-1 text-sm font-medium">{stat.label}</p>
          </div>
              ))}
        </div>
      </div> 
    </section>
    <section className="w-screen mt-24 py-20 px-0 pt-10 pb-0 text-center md:text-left">
      <div className=" bg-[#DEEED9] flex flex-col 
      md:flex-row items-center justify-between gap-6 min-h-[100px]">
        <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-2xl font-medium text-black px-6">
          Start Your Wellness Journey Today!
        </h2>
        <Image
          src="/images/medcine.png"
          alt="Medicine"
          height={0}
          width={240}
          className="object-contain h-auto"
        />
      </div>
    </section>
    {/* Footer Section */}
    <footer className="bg-green-100 px-6 pt-0 pb-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3 py-8">
            <Image
              src="/images/ayurmanthralogo.png" 
              alt="Ayurmanthra" 
              width={200} 
              height={76}
              className="h-[76px] w-auto" 
            />
          </div>
          <p className="text-gray-600">
            Ayurmanthra brings the wisdom of Ayurveda to modern wellness, offering premium herbal supplements for a balanced and healthy life.
          </p>
        </div>
      

        {/* Services */}
        <div className='py-6'>
          <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="font-medium text-xl text-black mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🍃 Custom Formulations</li>
            <li>🍃 Personalized Consultation</li>
            <li>🍃 Lifestyle Coaching</li>
            <li>🍃 Detox Programs</li>
            <li>🍃 Meditation Guides</li>
            <li>🍃 Online Store</li>
          </ul>
        </div>

        {/* Support */}
        <div className='py-6'>
          <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="font-medium text-xl text-black mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🍃 Help Support</li>
            <li>🍃 Forum Community</li>
            <li>🍃 FAQ</li>
            <li>🍃 Wellness Blog</li>
            <li>🍃 Contact us</li>
          </ul>
        </div>

        {/* Contact */}
        <div className=' py-6'>
          <h4 style={{ fontFamily: "'Onest', sans-serif" }} className="font-medium text-xl text-black mb-4">Get in touch</h4>
          <p className="text-sm text-gray-600 mb-2">Consultations & Order</p>
          <p className="font-semibold text-lg text-gray-900 mb-4">0203 8282 777</p>
          <p className="text-sm text-gray-600 mb-2">Email Support</p>
          <p className="font-semibold text-base text-gray-900">info@ayurmanthra.co.uk</p>
        </div>
  </div>
</footer>

{/* Copyright */}
<div className="bg-[#7FB53D] text-white py-4 text-center text-sm">
  © 2025 Ayurmanthra, All rights reserved.
</div>
  </>
  )
}

