import ParticlesBackground from "./ParticleBackground";

const IntroSection = () => {
  return (
    <section className="relative min-h-[500px] overflow-hidden py-36">
      <ParticlesBackground className="-z-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-10 ">
        <div>
          <h2 className="text-5xl text-green-700 mb-4 text-center  font-semibold">
            Kerala Ayurveda By Ayurmanthra
          </h2>
          <h3 className="text-lg text-[#843041] mb-6 text-center border-b-2 border-[#843041] pb-10">
            Ayurvedic Wellness and Beauty Clinic Croydon and Epsom, London
          </h3>
          <p className="text-xl text-gray-700 mb-6 text-center leading-9 mt-16">
            A warm welcome to
            <span className="italic mx-1 text-green-700 font-semibold">
              Ayurmanthra Ayurveda Massage Center
            </span>{" "}
            in{" "}
            <span className="italic mx-1 text-green-700 font-semibold">
              Croydon
            </span>
            and{" "}
            <span className="italic mx-1 text-green-700 font-semibold">
              Epsom
            </span>
            , London. Ayurmanthra Ayurveda Massage Center stands for
            professional massage service in your journey towards maximum
            immunity, optimum health, and happiness. We offer different types of
            traditional Kerala Ayurvedic body massages & treatments which
            include Abhyanga, Swedana, Shirodhara, and more.
          </p>
          <p className="text-xl text-gray-700 mb-6 text-center leading-9">
            {`Ayurmanthra, An Authentic traditional Ayurvedic treatment center at
            Croydon and Epsom. In "Sanskrit" Ayurmanthra means "LIFE WELL-BEING
            ENERGY. Our mission statement is Heal the Disease in Natural Way and
            lives a Healthy Life. Prevention is better than cure.`}
          </p>
          <p className="text-xl text-gray-700 mb-6 text-center leading-9">
            Ayurmanthra Massage center is a unique wellness center, specially
            designed for administering authentic Kerala ayurvedic massages and
            treatments in a clean, friendly, and timely manner. Our treatments
            are based upon centuries-old Ayurvedic therapies that support
            balance and bliss in your life. The qualified personnel here are
            keen in delivering quality treatments as expected by the tourists.
            Here we offer Head & Face massage, Shirodhara, Shirovasti, Nasyam,
            Herbal Steam Bath, Clay Therapy, Slimming Therapy, Pizhichil,
            Njavarakizhi. All treatments are done as per the directions of
            “Ayurvedic Vaidyans” (Ayurvedic Doctors) and are natural, gentle,
            and delightfully pleasing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
