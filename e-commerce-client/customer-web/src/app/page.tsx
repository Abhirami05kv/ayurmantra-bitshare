
import About from "./about/page";
import ConsultationPage from "./consultation/page";
import OurServices from "./ourservices/page";
import BlogPage from "./blog/page";

export default function Home() {
  return (
    <main>
      <div className="bg-[#DEEED9] min-h-[680px]">
        {/* <Header /> */}
        <section className="py-5">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-6 md:px-0">
            <div className="flex-1">
              <h6
                style={{ fontFamily: "Libre Baskerville" }}
                className=" text-[#7FB53D] italic  mb-2 fade-in-down"
              >
                Welcome to Ayurmanthra
              </h6>
              <h1
                style={{ fontFamily: "'Onest', sans-serif" }}
                className="text-[60.32px] font-light text-[#1F1F1F] mb-4 leading-[1.05] fade-in-down"
              >
                Feel and experience <br /> the traditional <br /> way of ayurveda.
              </h1>
              <div className="relative">
                <img
                  src="/images/olivee.png"
                  alt="Olive Leaf"
                  className="absolute -top-4 -left-16 w-40 h-auto z-0 opacity-80 pointer-events-none"
                />
                <div className="relative z-10">
                  <p
                    style={{ fontFamily: "'Onest', sans-serif" }}
                    className="text-[#1F1F1F] text-lg mb-6 font-medium text-[21.32px] fade-in-down"
                  >
                    Experience Holistic Wellness with Ayurmanthra: Embrace <br />{" "}
                    the Power of Ayurveda for a Balanced Life
                  </p>

                  <button className="bg-[#7FB53D] text-white px-6 py-3 rounded-full font-medium cursor-pointer hover:bg-green-100 hover:text-[#7FB53D] fade-in-down">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center ">
              {/* Background uzhichil Image */}
              <div className=" max-w-md w-full h-[450px] z-0 overflow-hidden mt-13">
                <img
                  src="/images/uzhichal.jpg"
                  alt="mint"
                  className="w-[85%] h-full object-cover zoom-in"
                  style={{ borderTopLeftRadius: "200px" }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConsultationPage/>
      <OurServices/>
      <BlogPage/>
      <About />
    </main>
  );
}
