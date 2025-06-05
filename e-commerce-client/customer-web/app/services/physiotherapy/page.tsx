import CommonHeader from '@/app/_components/CommonHeader';
import Image from 'next/image';
import React from 'react';
import { Card } from '@/components/ui/card';

export default function Physiotherapy() {
  const services = [
    "Comprehensive musculoskeletal assessment and evaluation",
    "Precise joint and muscle dysfunction diagnosis",
    "Advanced manual therapy and joint mobilization",
    "Personalized rehabilitation exercise programs",
    "Modern electrotherapy including ultrasound and TENS"
  ];

  const additionalServices = [
    "Expert-led virtual consultations and remote guided programs",
    "Convenient home physiotherapy services",
    "Integration of traditional wisdom with modern scientific approaches"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader title="Physiotherapy at Ayurmanthra Croydon & Epsom Clinics" src='/physiotherapyHeader.jpg'/>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] w-full">
              <Image 
                src="/physiotherapist.jpg"
                alt="Professional physiotherapy treatment"
                fill
                className="object-cover rounded-lg shadow-md"
                priority
              />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                Expert Physiotherapy Care
              </h1>
              <div className="space-y-4 text-lg text-gray-700 text-justify">
                <p >
                  Experience holistic healthcare focused on restoring your physical function 
                  and mobility through expert physiotherapy services.
                </p>
                <p>
                  At <span className="text-blue-600 font-semibold">Ayurmanthra</span>, 
                  we provide personalized care to promote recovery and enhance your quality of life.
                </p>
                <p className="text-xl font-medium text-gray-900">
                  Begin your journey to renewed movement and vitality today.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Core Services</h3>
            <div className="space-y-3">
              {services.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Additional Offerings</h3>
            <div className="space-y-3">
              {additionalServices.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Ayurmanthra?
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Our approach combines evidence-based treatments with personalized care plans, 
                ensuring optimal results for each patient&apos;s unique needs.
              </p>
              <p>
                With state-of-the-art facilities and experienced practitioners, 
                we&apos;re committed to supporting your recovery journey every step of the way.
              </p>
            </div>
          </div>
          
          <div className="relative h-[300px] w-full order-1 md:order-2">
            <Image 
              src="/phy-treatment.jpg"
              alt="Advanced physiotherapy techniques"
              fill
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </section>
      </main>
    </div>
  );
}