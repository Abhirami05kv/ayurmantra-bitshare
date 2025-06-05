import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { IoIosArrowRoundForward } from "react-icons/io";
const BlogList = () => {
  const blogPosts = [
    {
      id: 1,
      image: "/blog_img2.jpg",
      categories: ["Ayurveda"],
      title: "Herbal Facial: A Natural Path to Glowing Skin",
      date: "January 13, 2025",
      author: "Akshay Mohan",
      excerpt:
        "When it comes to skincare, combining the ancient wisdom of Ayurveda with modern techniques offers remarkable results...",
    },
    {
      id: 2,
      image: "/blog-img3.png",
      categories: ["Ayurveda", "Spa"],
      title: "PADA ABHYANGA: AYURVEDIC LEG MASSAGE FOR RELAXATION AND HEALING",
      date: "February 5, 2025",
      author: "Akshay Mohan",
      excerpt:
        "What is Pada Abhyanga? Pada Abhyanga is a traditional Ayurvedic foot and leg massage that enhances blood circulation, relieves pain, and promotes deep relaxation. Using medicated herbal oils, this therapy is a holistic approach to stress relief, detoxification, and pain management.",
    },
    {
      id: 3,
      image: "/blog_img5.jpg",
      categories: ["Ayurveda", "Spa"],
      title: "Potli Massage (Kizhi): A Timeless Ayurvedic Therapy for Wellness",
      date: "January 25, 2025",
      author: "Akshay Mohan",
      excerpt:
        "Potli Massage, also known as Kizhi therapy, is an ancient Ayurvedic treatment designed to heal the body, calm the mind, and restore balance. This natural therapy is gaining popularity worldwide for its ability to address various health conditions, including joint pain, muscle tension, and stress, us...",
    },
    {
      id: 4,
      image: "/herbal_hairmask.png",
      categories: ["Ayurveda"],
      title:
        "KESH VARDHINI: THE ULTIMATE HERBAL HAIR MASK FOR STRONGER, HEALTHIER HAIR",
      date: "January 13, 2025",
      author: "Akshay Mohan",
      excerpt:
        "Are you struggling with hair fall, dandruff, or dull, lifeless hair? Kesh Vardhini, a powerful Ayurvedic herbal hair mask, is the perfect solution for promoting hair growth, scalp nourishment, and deep conditioning.",
    },
    {
      id: 5,
      image: "/blog_img6.jpg",
      categories: ["Uncategorized"],
      title:
        "Revitalize Your Senses with Authentic Ayurvedic Stone Therapy at Ayurmanthra",
      date: "January 20, 2025",
      author: "Akshay Mohan",
      excerpt:
        "Welcome to Ayurmanthra, your sanctuary for authentic Ayurvedic therapies and holistic wellness. Specializing in Ayurvedic stone therapy, we bring the ancient wisdom of Ayurveda to your doorstep in London, Croydon, and Epsom. Let us guide you on a journey to relaxation, rejuvenation, and profound hea...",
    },
    {
      id: 6,
      image: "/blog_deeptissue.jpg",
      categories: ["Ayurveda", "Spa"],
      title:
        "Reconnect with Your Body's Natural Rhythm with Ayurmanthra's Deep Tissue Massage",
      date: "January 13, 2025",
      author: "Akshay Mohan",
      excerpt:
        "Your body is your greatest asset, but everyday life can lead to muscle tension, stiffness, and discomfort. At Ayurmanthra, we offer deep tissue massage therapy that integrates the ancient wisdom of Ayurveda with modern wellness practices to help you heal, rejuvenate, and restore balance.",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-10 p-5">
          {blogPosts.map((post) => (
            <article key={post.id} className="border-b pb-10 last:border-b-0">
              <div className="relative  mb-5 overflow-hidden ">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="object-cover transition-transform duration-500 hover:scale-100"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="text-[#843041] font-medium text-sm"
                    >
                      {category}
                      {index < post.categories.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold hover:text-[#843041] transition-colors text-[#0f8f3e]">
                  {post.title}
                </h2>

                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span>📅 Published On: {post.date}</span>
                  <span>-</span>
                  <span>By {post.author}</span>
                </p>

                <p className="text-gray-700 text-justify">{post.excerpt}</p>

                <CustomButton href="/blog">
                  <div className="flex justify-around items-center">
                    Read More
                    <IoIosArrowRoundForward size={15} />
                  </div>
                </CustomButton>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <CustomButton href="/blog">Load More Articles</CustomButton>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
