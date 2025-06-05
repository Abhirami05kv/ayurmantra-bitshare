import React from "react";
import AyurvedaTreatments from "@/app/_components/AyurvedaTreatments";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import CommonHeader from "@/app/_components/CommonHeader";
import VipFusion from "@/app/_components/VipFusion";
interface Indroprops {
  title: string;
  content: string;
}

const IntroSection = ({ title, content }: Indroprops) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Leaf className="h-5 w-5 text-primary/70" />
      <h2 className="text-xl font-semibold tracking-tight text-justify">{title}</h2>
    </div>
    <p className="text-muted-foreground leading-relaxed text-justify">{content}</p>
  </div>
);

const AyurvedaTreatment = () => {
  const introContent = [
    {
      title: "Best Ayurvedic Massage Centre in Croydon, London",
      content:
        "Ayurmanthra is an authentic Ayurvedic treatment centre in Croydon and Epsom, London. The distinguished Ayurvedic health centre offers a serene environment where Ayurveda's revered, timeless healing tradition works its magic on your mind, body, and spirit. Our friendly team of eminent Ayurvedic doctors will guide you through a seamless healing experience, ensuring effective and lasting results.",
    },
    {
      title: "Authentic Ayurveda Experience",
      content:
        "At Ayurmanthra, our approach prioritizes authentic Ayurveda over mere wellness. Each guest receives a customized treatment plan to address specific health concerns. Our therapies aim not only to relieve symptoms but to cure the root causes of ailments by maintaining the body's balance and promoting long-term well-being.",
    },
  ];

  return (
    <>
      <CommonHeader
        title="Ayurveda Treatment Centre Croydon, London"
        subtitle="Ayurveda and Holistic Health Centre Croydon, London"
        src="/ayurimage.png"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 lg:py-12 ">
          <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
            <CardContent className="p-6 lg:p-8">
              {/* Introduction Sections */}
              <div className="max-w-3xl mx-auto">
                <div className="space-y-8">
                  {introContent.map((section, index) => (
                    <IntroSection
                      key={index}
                      title={section.title}
                      content={section.content}
                    />
                  ))}
                </div>
              </div>

              {/* Treatments Section */}
              <div className="mt-12 text-justify">
                <AyurvedaTreatments />
              </div>
            </CardContent>
            <VipFusion/>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AyurvedaTreatment;
