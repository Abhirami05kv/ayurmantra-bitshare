"use client";
import Head from "next/head";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AyurmanthraBlog from "./_components/AyurmanthraBlog";
import GoogleReview from "./_components/GoogleReview";
import Consultation from "./_components/Consultation";
import IndroSection from "./_components/IndroSection";
import CustomButton from "./_components/CustomButton";
import Ourservices from "./_components/Ourservices";
import Certificates from "./_components/Certificates";

const Home = () => {
  return (
    <>
      <Head>
        <title>
          Ayur Manthra - Kerala Ayurvedic Centre & Physiotherapy Clinic
        </title>
        <meta
          name="description"
          content="Ayur Manthra offers authentic Kerala Ayurvedic treatments and physiotherapy services"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" mx-auto px-0 lg:-mt-32 md:mt-0 ">
        <section className="relative w-full h-auto ">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={4000}
            stopOnHover
            showStatus={false}
            className="w-full h-full"
          >
            {["/main_img.png", "/spa.jpg", "/spa2.jpg", "/spa3.jpg"].map(
              (src, index) => (
                <div
                  key={index}
                  className="relative w-full h-[300px] md:h-[400px] lg:h-[97vh]"
                >
                  <Image
                    src={src}
                    alt={`Ayurvedic Treatment ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    fill
                    priority
                  />
                  <div className="absolute bottom-14 inset-x-0 flex justify-center ">
                    <CustomButton href="/shop" className="text-lg">Shop</CustomButton>
                  </div>
                </div>
              )
            )}
          </Carousel>
        </section>

        <IndroSection />
        <Consultation />
        <Certificates />
        {/* Our services */}
        <Ourservices />
        <section>
          <GoogleReview />
        </section>
        <section>
          <AyurmanthraBlog />
        </section>
      </main>
    </>
  );
};
export default Home;
