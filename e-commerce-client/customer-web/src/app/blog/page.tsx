"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BlogPage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const blogs = [
    {
      image: "/images/cucumber.jpeg",
      title: "Ayurvedic Detox and Weight Balance with Ayur Manthra",
      date: "September 27, 2021",
      author: "Sanjay Shenoi",
      location: "Dhanwanthari Madom",
    },
    {
      image: "/images/immune.jpeg",
      title: "Boost Immune System Naturally Against Covid-19",
      date: "September 9, 2020",
      author: "Sanjay Shenoi",
      location: "Dhanwanthari Madom",
    },
    {
      image: "/images/kizhi.jpg",
      title: "Kizhi Treatment – Epic Formula To Heal Your Mind And Body",
      date: "July 30, 2020",
      author: "Ayurmanthra",
      location: "",
    },
     {
      image: "/images/nasya.webp",
      title: "Clear Your Mind & Breathe Freely:The Magic of Nasiya Therapy",
      date: "March 4, 2025",
      author: "Akshay Mohan",
      location: "",
    },
     {
      image: "/images/panchakarma.jpg",
      title: "Punchakarma: The Ultimate Ayurvedic Delox Therapy at Ayurmanthra",
      date: "February 27, 2025",
      author: "Akshay Mohan",
      location: "",
    },
     {
      image: "/images/abhyangamassage.jpg",
      title: "Abhyanga Massage: The Ayurvedic Secret to Total Relaxation",
      date: "February 19, 2025",
      author: "Akshay Mohan",
      location: "",
    },
  ];


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    let isScrolling = true;
    const scrollStep = 1;
    const intervalDelay = 20;
    let animationFrameId: number;

    const autoScroll = () => {
    if (!isScrolling) return;       
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

       if (scrollAmount >= maxScroll) {

        // Reset to start smoothly
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;
      }
     
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Pause on hover
    const handleMouseEnter = () => isScrolling = false;
    const handleMouseLeave = () => {
      isScrolling = true;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    return () => { 
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, []);


  return (
    <div className="bg-white px-6 py-12">
      {/* Top Heading */}
      <div className="max-w-6xl mx-auto mb-12 ml-20">
        <h2 style={{ fontFamily: "Libre Baskerville" }} className=" text-xl italic text-[#7FB53D] text-left" >
          Ayurmanthra Blog
        </h2>
      </div>

     {/* Blog Grid */}
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div ref={scrollRef} 
        className="flex gap-8 flex-nowrap overflow-x-hidden"
          >
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white shadow-lg rounded-tr-[70px] shadow-lg overflow-hidden w-[calc(100%/3-1.33rem)] flex-shrink-0">
              <Image
                src={blog.image}
                alt={blog.title}
                width={400} // example size, you can adjust if needed
                height={250}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-5 text-left">
                <h3
                  style={{ fontFamily: "'Onest', sans-serif" }}
                  className="text-xl font-semibold mb-2 leading-snug"
                >
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.date} by {blog.author}
                </p>
              </div>
           </div>
         ))}
       </div>
     </div>

     {/* Professional Associations */}
     <div className="text-[#7FB53D] italic mb-4 mt-24 ml-18">
        "All our Ayurvedic practitioners and therapists are active members of"
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="flex flex-wrap justify-center gap-42">
          <Image 
            src="/images/associate1.png" 
            alt="Association 1" 
            width={200}
            height={100}
            className="h-26 object-contain" 
          />
          <Image  
            src="/images/associate2.png" 
            alt="Association 2" 
            width={200}
            height={100}
            className="h-24 w-auto object-contain" 
          />
          <Image  
            src="/images/associate3.png" 
            alt="Association 3"
            width={200}
            height={100}
            className="h-24 object-contain" 
          />
        </div>
      </div>
   </div>
  );
}

    