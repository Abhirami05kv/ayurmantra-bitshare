import Head from "next/head";
import Image from "next/image";

// Define the type for the state
const Home: React.FC = () => {
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

      <main className="container mx-auto px-4">
        <header className="flex justify-between items-center py-4 bg-gray-100">
          <div className="logo">
            <Image
              src="/logo.png"
              alt="Ayur Manthra Logo"
              width={200}
              height={50}
            />
          </div>
          <nav className="nav">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  BRANCHES
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  ABOUT US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  SERVICES
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  SHOP
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  CAREERS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  CONTACT US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  BLOG
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold text-gray-700 hover:text-pink-500"
                >
                  AYUR MANTHRA - PRICE LIST
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <section className="hero text-center mt-6">
          <Image
            src="/hero.jpg"
            alt="Woman receiving Ayurvedic treatment"
            layout="responsive"
            width={1200}
            height={600}
          />
          <h1 className="text-3xl font-semibold mt-6">
            Frequently Asked Questions
          </h1>
        </section>

        <section className="content py-8">
          <div className="intro">
            <h2 className="text-3xl font-bold mb-4">Welcome to Ayur Manthra</h2>
            <p className="text-lg text-gray-700">
              Ayur Manthra is a Kerala-based Ayurvedic center offering
              traditional healing treatments. Our services focus on the
              well-being of body and mind through holistic approaches.
            </p>
          </div>

          <div className="call-to-action text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">
              Explore Our Ayurveda Treatments
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Visit us to experience the true healing power of Ayurveda. We look
              forward to supporting your journey to better health and wellness.
            </p>
            <a
              href="#"
              className="bg-pink-500 text-white py-3 px-8 rounded-lg hover:bg-pink-600"
            >
              Make an Appointment
            </a>
          </div>
        </section>

        <footer className="text-center py-6 bg-gray-100 mt-12">
          <p>&copy; 2025 Ayur Manthra. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
};

export default Home;
