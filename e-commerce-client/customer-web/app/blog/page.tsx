import React from "react";
import BlogCard from "../_components/blog";
import { FaChevronRight } from "react-icons/fa";

const Blog = () => {
  return (
    <div className="container mx-auto p-6 flex flex-wrap md:flex-nowrap gap-6">
      {/* Main Blog Content */}
      <div className="w-full md:w-2/3">
        <BlogCard />
      </div>

      {/* Sidebar with Recent Posts */}
      <div className="w-full md:w-1/3 rounded-lg ">
        <div  className="bg-gray-100 p-6  shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Posts</h2>
          <ul className="space-y-4">
            {[
              "Reconnect with Your Body’s Natural Rhythm with Ayurmanthra’s Deep Tissue Massage",
              "Potli Massage (Kizhi): A Timeless Ayurvedic Therapy for Wellness",
              "Revitalize Your Senses with Authentic Ayurvedic Stone Therapy at Ayurmanthra",
              "Herbal Facial: A Natural Path to Glowing Skin",
              "Ayurvedic Diet Tips for a Healthy Living in the UK",
            ].map((post, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-200 transition cursor-pointer"
              >
                <FaChevronRight className="text-gray-600" />
                <span className="text-gray-700 font-medium">{post}</span>
              </li>
            ))}
          </ul>
  
          {/* Archives Section */}
          <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-800">Archives</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="space-y-3">
              {[
                "February 2025",
                "January 2025",
                "December 2024",
                "November 2024",
                "October 2024",
                "September 2024",
                "September 2021",
                "September 2020",
                "July 2020",
              ].map((archive, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                >
                  <FaChevronRight className="text-gray-600" />
                  <span className="text-gray-700 font-medium">{archive}</span>
                </li>
              ))}
            </ul>
          </div>
        </div >
      </div>
    </div>
  );
};

export default Blog;