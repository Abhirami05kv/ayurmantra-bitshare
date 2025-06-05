"use client";

import { FaPhone, FaMobileAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const branches = [
  {
    name: "CROYDON BRANCH",
    address: [
      "505 B London Road,",
      "Thornton Heath,",
      "Opposite to University Hospital Croydon",
      "CR7 6AR",
    ],
    phone: "0203 6206 999",
    mobile: "0744 0277 607",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.782674706367!2d-0.10637742358278835!3d51.390883220837206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0000000000000000!2sUniversity%20Hospital%20Croydon!5e0!3m2!1sen!2suk!4v1610000000000!5m2!1sen!2suk",
  },
  {
    name: "EPSOM BRANCH",
    address: ["453 Kingston Road,", "Epsom,", "KT19 0DB"],
    phone: "0203 8282 777",
    mobile: "0754 9866 777",
    email: "info@ayurmanthra.co.uk",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.092018263091!2d-0.2664736235847054!3d51.34787217961916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487609b111111111%3A0x2222222222222222!2sEpsom!5e0!3m2!1sen!2suk!4v1610000000000!5m2!1sen!2suk",
  },
];

export default function BranchesPage() {
  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium mb-10">
        Find an Ayurmanthra location near you.</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {branches.map((branch, i) => (
          <div key={i} className="bg-white rounded shadow-lg p-6 border border-gray-200">
            <h2 style={{ fontFamily: "'Onest', sans-serif" }} className="text-xl font-medium text-blue-900 flex items-center gap-2">
              <FaMapMarkerAlt /> {branch.name}
            </h2>

            <div className="mt-6">
              <p style={{ fontFamily: "'Onest', sans-serif" }} className="font-semibold">Address:</p>
              {branch.address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              <span>Phone: {branch.phone}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaMobileAlt className="text-blue-600" />
              <span>Mobile: {branch.mobile}</span>
            </div>

            {branch.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-600" />
                <span style={{ fontFamily: "'Onest', sans-serif" }}>Email: {branch.email}</span>
              </div>
            )}

            <p style={{ fontFamily: "'Onest', sans-serif" }} className="mt-4 font-semibold">Location:</p>
            <iframe
              src={branch.mapSrc}
              width="100%"
              height="200"
              className="rounded"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
