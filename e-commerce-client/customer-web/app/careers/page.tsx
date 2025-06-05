import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Upload } from "lucide-react";
import CommonHeader from "../_components/CommonHeader";
import CustomButton from "../_components/CustomButton";

export default function Careers() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader
        title="Join Our Team"
        subtitle="Be part of a growing wellness community dedicated to holistic healing"
        src="/careerHeader.jpg"
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Ayurvedic Massage Therapist
              </h2>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  CODE-23415
                </span>
                <span className="text-sm">Band 3 or Equivalent Experience</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Job Description
                </h3>
                <p className="text-gray-600 text-justify">
                  We are looking for experienced Ayurvedic Massage Therapists to
                  join our team in Croydon and Epsom. You will work alongside
                  Ayurvedic Practitioners, providing specialized therapies and
                  wellness treatments.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What We Offer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Traditional Kerala Ayurvedic Treatments",
                    "Pain Management Therapies",
                    "Dietary & Wellness Guidance",
                    "Yoga & Meditation Sessions",
                    "Beauty & Spa Therapies",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>Email </span>
              <a
                href="mailto:info@ayurmanthra.co.uk"
                className="text-blue-600 hover:underline"
              >
                info@ayurmanthra.co.uk
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Apply Now
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" placeholder="Full Name" className="w-full" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full"
                />
                <Input type="text" placeholder="Subject" className="w-full" />
              </div>

              <Textarea placeholder="Your Message" className="min-h-[120px]" />

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <Upload className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <Input type="file" className="w-full cursor-pointer" />
                </div>
              </div>

              <CustomButton href="/careers" className="w-full">
                {" "}
                Submit Application
              </CustomButton>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
