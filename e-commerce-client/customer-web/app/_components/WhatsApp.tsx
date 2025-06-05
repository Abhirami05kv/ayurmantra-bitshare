"use client";
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';

const WhatsApp = () => {
  const [showBranches, setShowBranches] = useState(false);

  const branches = [
    {
      name: "Croydon Branch",
      phone: "+447440277607",
      address: "505 B London Road, Thornton Heath",
      message: "Hello from Ayurmanthra Croydon branch! How can we help you today?"
    },
    {
      name: "Epsom Branch",
      phone: "+447549866777",
      address: "453 Kingston Road, Epsom",
      message: "Hello from Ayurmanthra Epsom branch! How can we help you today?"
    }
  ];

  const openWhatsApp = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* WhatsApp toggle button */}
      <button
        onClick={() => setShowBranches(!showBranches)}
        className="bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        {showBranches ? (
          <IoClose className="w-6 h-6" />
        ) : (
          <FaWhatsapp className="w-6 h-6" />
        )}
      </button>

      {/* Branches dropdown */}
      {showBranches && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in border border-gray-100">
          <div className="bg-[#25D366] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HiOutlineChatBubbleBottomCenterText className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">Start a Conversation</h3>
                <p className="text-xs opacity-90">Select a branch to chat on WhatsApp</p>
              </div>
            </div>
            <button 
              onClick={() => setShowBranches(false)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {branches.map((branch) => (
              <div 
                key={branch.name}
                onClick={() => openWhatsApp(branch.phone, branch.message)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{branch.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{branch.address}</p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsApp;