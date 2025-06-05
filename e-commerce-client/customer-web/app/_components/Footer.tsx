import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-600 to-[#3b6607] text-white py-6 px-4 text-center shadow-lg">
      <div className="container mx-auto">
        {/* Centered Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/ayurmanthra-logo.png"
            alt="Ayurmanthra Logo"
            width={200}
            height={200}
            loading="lazy"
            className="object-contain"
          />
        </div>

        {/* Branch Information */}
        <div className="text-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Thornton Heath</h3>
            <p>505 B London Road</p>
            <p>Opposite University Hospital</p>
            <p>Croydon, CR7 6AR</p>
            <p>
              Phone:{" "}
              <a href="tel:02036206999" className="text-green-300">
                0203 6206 999
              </a>{" "}
              /{" "}
              <a href="tel:07440277607" className="text-green-300">
                0744 0277 607
              </a>
            </p>
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Epsom</h3>
            <p>453 Kingston Road</p>
            <p>Epsom, KT19 0DB</p>
            <p>
              Phone:{" "}
              <a href="tel:02038282777" className="text-green-300">
                0203 8282 777
              </a>{" "}
              /{" "}
              <a href="tel:07549866777" className="text-green-300">
                0754 9866 777
              </a>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 border-t border-white pt-4 text-sm">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
