import React from "react";
import CommonHeader from "../_components/CommonHeader";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  Clock,
  Navigation,
  ExternalLink,
} from "lucide-react";

const Branches = () => {
  const branches = [
    {
      name: "Croydon",
      address: [
        "505 B London Road",
        "Thornton Heath",
        "Opposite to University Hospital Croydon",
        "CR7 6AR",
      ],
      contact: {
        phone: "0203 6206 999",
        mobile: "0744 0277 607",
      },
      hours: [
        "Monday - Friday: 9AM - 7PM",
        "Saturday: 10AM - 5PM",
        "Sunday: Closed",
      ],
    },
    {
      name: "Epsom",
      address: ["453 Kingston Road", "Epsom", "KT19 0DB"],
      contact: {
        phone: "0203 8282 777",
        mobile: "0754 9866 777",
        email: "info@ayurmanthra.co.uk",
      },
      hours: [
        "Monday - Friday: 9AM - 7PM",
        "Saturday: 10AM - 5PM",
        "Sunday: Closed",
      ],
    },
  ];

  // Function to create a Google Maps URL from address lines
  const getMapsUrl = (addressLines: string[]): string => {
    const query = addressLines.join(", ").replace(/ /g, "+");
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <>
      <CommonHeader title="Find Ayurmanthra" />

      <section className="px-6 sm:px-12 md:px-16 lg:px-20 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 text-green-700">
            Our Branches
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Visit one of our Ayurmanthra clinics for authentic Ayurvedic
            treatments and consultations
          </p>

          <div className="space-y-10">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Branch Info */}
                  <div className="p-6 lg:col-span-1 border-r border-gray-100">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="bg-green-50 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-semibold text-green-700">
                        {branch.name}
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <Building className="h-5 w-5 mt-1 text-gray-500 shrink-0" />
                        <div>
                          {branch.address.map((line, i) => (
                            <p
                              key={i}
                              className="text-gray-600 text-sm leading-relaxed"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-500">
                          Contact Information
                        </h4>
                        {branch.contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a
                              href={`tel:${branch.contact.phone}`}
                              className="text-gray-600 hover:text-green-600 transition"
                            >
                              {branch.contact.phone}
                            </a>
                          </div>
                        )}
                        {branch.contact.mobile && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <a
                              href={`tel:${branch.contact.mobile}`}
                              className="text-gray-600 hover:text-green-600 transition"
                            >
                              {branch.contact.mobile}
                            </a>
                          </div>
                        )}
                        {branch.contact.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <a
                              href={`mailto:${branch.contact.email}`}
                              className="text-gray-600 hover:text-green-600 transition"
                            >
                              {branch.contact.email}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Hours */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-500">
                          Opening Hours
                        </h4>
                        {branch.hours.map((hour, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{hour}</span>
                          </div>
                        ))}
                      </div>

                      {/* Directions */}
                      <div className="pt-3 flex gap-2">
                        <a
                          href={getMapsUrl(branch.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition flex-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Map
                        </a>
                        <a
                          href={getMapsUrl(branch.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex-1"
                        >
                          <Navigation className="h-4 w-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Google Map */}
                  <div className="lg:col-span-2 h-full">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA_p5j8PM9fX3pGuMrcFY7ohph6jJ1OVUs&q=${encodeURIComponent(
                        branch.address.join(", ")
                      )}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "400px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Us Section */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-md">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-6">
                For appointments, inquiries, or more information about our
                Ayurvedic treatments and services, please contact your nearest
                Ayurmanthra branch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-md mx-auto">
                <a
                  href="mailto:info@ayurmanthra.co.uk"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition w-full sm:w-auto"
                >
                  <div className="bg-green-50 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <span>info@ayurmanthra.co.uk</span>
                </a>
                <a
                  href="tel:02038282777"
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition w-full sm:w-auto"
                >
                  <div className="bg-green-50 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <span>0203 8282 777</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Branches;
