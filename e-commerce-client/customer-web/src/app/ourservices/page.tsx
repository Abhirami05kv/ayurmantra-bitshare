export default function OurServices() {
  return (
    <div className="bg-white px-6 py-12">
      {/* Top Heading and Subtitle */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 style={{ fontFamily: "Libre Baskerville" }} className="-ml-16 text-lg italic text-[#7FB53D] mb-2 text-left" >
          Our Services
        </h2>
        <p style={{ fontFamily: "'Onest', sans-serif" }} className="-ml-12 text-2xl font-medium text-left">
          Treatments for rejuvenation, relaxation and recreation.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-[#DEEED9] shadow-lg rounded-lg p-6 text-center">
          <img
            src="/images/abhyanga.jpg"
            alt="Abhyanga"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-xl font-semibold mb-1">Abhyanga</h3>
          <p className="italic mb-2">(Full Body Oil Massage)</p>
          <p className="text-gray-600 text-sm">
            Abhyanga is a traditional Ayurvedic herbal oil massage. The goal is to relax the body and mind, improving energy flow and relieving stress, anxiety, and depression.
          </p>
          <button  className="mt-4 bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
            Read More</button>
        </div>

        {/* Card 2 */}
        <div className="bg-[#DEEED9] shadow-lg rounded-lg p-6 text-center">
          <img
            src="/images/shiroabhyanga.jpg"
            alt="Shiro Abhyanga"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-xl font-semibold mb-1">Shiro Abhyanga</h3>
          <p className="italic mb-2">(Indian Head Massage)</p>
          <p className="text-gray-600 text-sm">
            A special oil massage for the back, shoulder, and neck. Helps reduce muscle pain, stiffness, and other disorders like spondylosis and sciatica.
          </p>
          <button  className="mt-4 bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
            Read More</button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#DEEED9] shadow-lg rounded-lg p-6 text-center">
          <img
            src="/images/katiabhyanga.jpg"
            alt="Kati Abhyanga"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-xl font-semibold mb-1">Kati Abhyanga</h3>
          <p className="italic mb-2">(Back Massage)</p>
          <p className="text-gray-600 text-sm">
            A targeted massage for back pain relief, improving circulation and flexibility while easing muscle tension.
          </p>
          <button  className="mt-4 bg-[#7FB53D] hover:bg-green-100 hover:text-[#7FB53D] cursor-pointer text-white px-6 py-2 rounded-full font-medium transition">
            Read More</button>
        </div>
      </div>
    </div>
  );
}
