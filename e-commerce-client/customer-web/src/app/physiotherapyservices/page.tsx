import React from 'react'
import Image from 'next/image'

const PhysioTherapyServices = () => {
  return (
    <>
    <div className="max-w-screen mx-auto px-4 py-12 bg-[#DEEED9]">
        <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium">
           Physiotherapy at Ayurmanthra Croydon & Epsom clinics
        </h1>
    
        <div className="relative w-full h-150 mb-8 rounded-lg overflow-hidden mt-14">
            <Image
              src="/images/physiotherapy.jpg" 
              alt="Pshysiotherapy"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
        </div>

     {/* 25% Image | 75% Text Grid Section */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center mb-12 mt-8">
    {/* Image Column (25%) */}
        <div className="md:col-span-1">
          <div className="relative h-64 w-full rounded-lg overflow-hidden mt-4">
            <Image
              src="/images/physio1.webp"
              alt="Physiotherapy Treatment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
            />
          </div>
        </div>
        
        {/* Text Column (75%) */}
        <div className="md:col-span-3 ml-4 mr-4 mt-4 text-justify" style={{ fontFamily: "'Onest', sans-serif" }}>
            <p>
                Physiotherapy, also known as physical therapy, is a holistic approach to healthcare 
                that focuses on restoring and enhancing physical function, mobility, and overall 
                quality of life. Rooted in  evidence based practices, it combines manual therapy, 
                exercises, and advanced technologies to address a wide range of Physical Conditions.
                As a medical science, physiotherapy is dedicated to diagnosing, managing, and 
                preventing physical dysfunction caused by injury, illness, or aging. Tailored to 
                individual needs, it promotes recovery and empowers individuals to regain strength, 
                balance, and confidence in their movements.
                With heartfelt gratitude, our entire team thanks you for the immense support and love you have
                shown us over the years. Your trust has been the foundation of our growth and success.
                At Ayurmanthra, our physiotherapy services are designed to offer personalized care that blends
                traditional wisdom with modern science. Our expert team is committed to helping you achieve
                your health and wellness goals through compassionate, innovative approaches.
                Discover the power of movement and reclaim your active life with Ayurmanthra Physiotherapy.
                Here, we empower you to move freely, live fully, and rediscover the joy of movement with expert
                care tailored to your needs.
            </p>
        </div>
    </div>

    <h6 style={{ fontFamily: "Libre Baskerville" }} className='text-[#7FB53D] text-xl italic font-medium ml-4 mt-4'>
        Our Services
    </h6>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center mb-12 mt-3">
        <div className="md:col-span-3 ml-4 mr-4 mt-3" style={{ fontFamily: "'Onest', sans-serif" }}>
            <p>
                <span className="font-semibold italic">Comprehensive Evaluation: </span> 
                Assessment of musculoskeletal conditions, posture, and functional impairments.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Condition Diagnosis: </span> 
                Expertise in identifying issues such as ligament injuries, whiplash, and joint or muscle dysfunctions.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Hands-On Techniques: </span> 
                Joint mobilization, manipulation, soft tissue, and deep tissue release.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Exercise Programs: </span> 
                Customized plans for rehabilitation and recovery.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Electrotherapy Modalities: </span> 
                Ultrasound therapy, TENS, and Interferential therapy for pain relief and healing.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Neurological Physiotherapy: </span> 
                Specialized care for conditions such as stroke, multiple sclerosis, and Parkinson’s disease.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Occupational Health Physiotherapy: </span> 
                Prevention and management of work-related conditions, including back pain and carpal tunnel syndrome.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Post-Operative Rehabilitation: </span> 
                Tailored recovery programs for surgical patients.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Sports Injury Management: </span> 
                Injury diagnosis, treatment, and prevention.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Taping and Bracing: </span> 
                Support for injuries and physical performance.
            </p>

            <h6 style={{ fontFamily: "Libre Baskerville" }} className='text-[#7FB53D] text-xl italic font-medium ml-3 mt-6'>
                Additional Offerings
            </h6>
            <p className='mt-3'>
                <span className="font-semibold italic">Sports Injury Management: </span> 
                Injury diagnosis, treatment, and prevention.
            </p>
            <p className='mt-2'>
                <span className="font-semibold italic">Taping and Bracing: </span> 
                Support for injuries and physical performance.
            </p>
            <p className='mt-2'>
                At Ayurmanthra, we blend traditional wisdom with modern science to deliver 
                compassionate and innovative care. Let us help you rediscover the joy of 
                movement and achieve your wellness goals.
            </p>
        </div>

        
        <div className="md:col-span-1">
          <div className="relative h-110 w-full rounded-lg overflow-hidden mr-14 mt-4">
            <Image
              src="/images/physio3.jpg"
              alt="Physiotherapy Treatment"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 300px"
            />
          </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default PhysioTherapyServices