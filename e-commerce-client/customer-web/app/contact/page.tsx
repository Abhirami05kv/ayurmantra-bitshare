"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import CommonHeader from "../_components/CommonHeader";
import CustomButton from "../_components/CustomButton";

const ContactPage = () => {
  const openingHours = [
    { day: "Monday - Thursday", hours: "9:00 AM - 8:00 PM" },
    { day: "Friday - Saturday", hours: "9:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 8:00 PM" },
  ];

  const handleAddressClick = () => {

    const address = "505 B London Road, Thornton Heath, Croydon CR7 6AR";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader
        title="Contact Us"
        subtitle="Feel free to contact us at any time to know and inquire about our ayurvedic treatments, therapies, and methods."
        src="/contactHeader.jpg"
      />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className="flex items-start space-x-3 cursor-pointer group"
                  onClick={handleAddressClick}
                >
                  <MapPin className="w-5 h-5 text-green-600 mt-1 group-hover:text-green-700 transition-colors" />
                  <div className="group-hover:text-green-700 transition-colors">
                    <p className="font-semibold text-gray-900 group-hover:text-green-700">AYURMANTHRA</p>
                    <p className="text-gray-600 group-hover:text-green-600">505 B London Road</p>
                    <p className="text-gray-600 group-hover:text-green-600">Thornton Heath</p>
                    <p className="text-gray-600 group-hover:text-green-600">Croydon, CR7 6AR</p>
                    <p className="text-xs text-green-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view on map
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <a href="tel:02036206999" className="text-gray-600 hover:text-green-600 transition">
                      0203 6206 999
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <a href="mailto:info@ayurmanthra.co.uk" className="text-gray-600 hover:text-green-600 transition">
                      info@ayurmanthra.co.uk
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-5 h-5 text-green-600" />
                    <p className="font-semibold text-gray-900">Opening Hours</p>
                  </div>
                  <div className="space-y-2">
                    {openingHours.map(({ day, hours }) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-600">{day}</span>
                        <span className="text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input placeholder="Name" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Input type="email" placeholder="Email" className="w-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input type="tel" placeholder="Phone" className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Input placeholder="Subject" className="w-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Your message"
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <CustomButton className="w-full" href="/contact">      Send Message</CustomButton>
                </form>
              </CardContent>
            </Card>

         
          </div>
        </div>
      </div>
         {/* Google Map Section */}
         <div className="mt-5 w-full h-96  overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.082963474135!2d-0.1144858232230869!3d51.39846807181338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487607d5c5c1c7a9%3A0x1aaf8a0d8b1b1b1b!2s505B%20London%20Rd%2C%20Thornton%20Heath%2C%20Croydon%20CR7%206AR%2C%20UK!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
    </div>
  );
};

export default ContactPage;