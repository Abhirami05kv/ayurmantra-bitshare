"use client"
import Image from "next/image";
import React from "react";
import CommonHeader from "../_components/CommonHeader";
import { motion } from 'framer-motion'
import ParticlesBackground from "../_components/ParticleBackground";
function About() {
  return (
    <div className="bg-white">
      <CommonHeader
        title="Ayurveda Treatment Centre Croydon and Epsom, London"
        subtitle="An Authentic traditional Ayurvedic treatment center at Croydon and Epsom"
        src="/aboutHeader.jpeg"
      />

      {/* Hero Section */}
     <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    
        <div className="flex flex-col items-center">
          <Image
            src="/ayurmanthra-separator.png"
            alt="Decorative separator"
            width={60}
            height={60}
            className="mb-8"
          />
          <motion.h1   initial={{ x:'-10%' }}
           whileInView={{ x:'0' }}
           exit={{x:'10%'}}
           transition={{ duration: 1 }}   className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center max-w-4xl leading-tight">
           <span > Authentic Ayurveda Treatment Centre</span>
            <span  className="block text-[#128117] mt-2">
              Croydon and Epsom, London
            </span>
          </motion.h1>
          <motion.div
           initial={{ x:'10%' }}
           whileInView={{ x:'0' }}
           exit={{x:'-10%'}}
           transition={{ duration: 1 }}
          className="mt-8 max-w-3xl">
            <p className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
              A warm welcome awaits you at Ayurmanthra. In &quot;Sanskrit&quot;
              Ayurmanthra means &quot;LIFE WELL-BEING ENERGY&quot;. We follow a
              holistic curative methodology aimed at finding the root cause of
              the disease and healing it, offering effective and result-based
              Ayurveda treatments for various ailments.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              Our mission statement is to heal the disease naturally and promote
              a healthy life. Ayurveda, one of the oldest holistic healing
              systems, means &quot;The Science of Life.&quot; Originating in
              India over 5000 years ago, it is often called the &quot;Mother of
              all Healing.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is Ayurveda Section */}
     <ParticlesBackground className="-z-0"/>
        <section className=" py-20">
      
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/3">
                <div className="relative rounded-2xl overflow-hidden ">
                  <Image
                    src="/ayurvedaAbout.png"
                    alt="Ayurveda Illustration"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <motion.div className="w-full lg:w-2/3"     initial={{ y:'15%' }}
             whileInView={{ y:'0' }}
             exit={{y:'-15%'}}
             transition={{ duration: 1 }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  What is Ayurveda?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 text-justify">
                  Thousands of years before modern medicine provided scientific
                  evidence for the mind-body connection, the sages of India
                  developed Ayurveda, which remains one of the most sophisticated
                  and powerful health systems today.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
                  Ayurveda is not just about treating illness; it is a science of
                  life (
                  <span className="font-semibold">
                    Ayur = life, Veda = science
                  </span>
                  ). It offers wisdom to help people stay vibrant and healthy
                  while realizing their full potential.
                </p>
                <div className="bg-white rounded-xl p-6 shadow-sm text-justify">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    The Two Main Guiding Principles of Ayurveda:
                  </h3>
                  <ol className="space-y-3">
                    <li className="flex items-center text-lg text-gray-600">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#128117] text-white rounded-full mr-3">
                        1
                      </span>
                      The mind and the body are inextricably connected.
                    </li>
                    <li className="flex items-center text-lg text-gray-600">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#128117] text-white rounded-full mr-3">
                        2
                      </span>
                      Nothing has more power to heal and transform the body than
                      the mind.
                    </li>
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
    

      {/* Massage Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#128117] mb-12">
            Ayurveda Massage London
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{x:'-8%'}} whileInView={{x:'0'}} exit={{x:'8%'}} transition={{duration:1}}  className="bg-green-50 rounded-xl p-6 shadow-sm">
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Ayurmanthra strives to make the ancient Indian Holistic Health
                techniques of Ayurveda and Yoga a way of life. We believe that
                the secrets submerged in ancient texts and age-old therapeutic
                practices can end modern-day stress and enable one to live life
                to the fullest.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-4  text-justify">
                Ayurveda, the traditional Indian holistic health management
                system, offers a range of traditional Kerala therapies and
                herbal medicines to balance the bodily principles and integrate
                body, mind, and spirit.
              </p>
            </motion.div>
            <motion.div className="bg-green-50 rounded-xl p-6 shadow-sm" initial={{x:'8%'}} whileInView={{x:'0'}} exit={{x:'-8%'}} transition={{duration:1}} >
              <p className="text-lg text-gray-600 leading-relaxed  text-justify">
                We offer both wellness and curative programs. Ayurmanthra
                wellness programs help you relax, rejuvenate, and improve
                quality of life, while curative treatments address various
                ailments through herbal medicines, massages, and therapies.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-4  text-justify">
                Massage techniques involve medication and patterns. The type of
                medication can be oil, powder, or paste, and the strokes used
                vary depending on the treatment objective.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
