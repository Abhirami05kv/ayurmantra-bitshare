
"use client"
import CommonHeader from "../_components/CommonHeader";
import { data } from "./faqData";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomButton from "../_components/CustomButton";


function FAQPage() {
  const router =useRouter()
  return (
    <>
      <CommonHeader title="Frequently Asked Questions" src="/faqHeader.jpg" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <Card className="bg-white/90 backdrop-blur-sm border-green-100">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-green-700">
              Discover Ayurmanthra Knowledge
            </CardTitle>
            <p className="text-[# 843041] mt-2">
              Find answers to common questions about our Ayurvedic products and wellness solutions
            </p>
          </CardHeader>
          
          <CardContent>
            {data.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {data.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={`item-${item.id}`}
                    className="border border-green-100 rounded-lg px-2 bg-white data-[state=open]:bg-green-50 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-medium text-lg text-green-700 hover:text-green-600 hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-green-700 leading-relaxed pb-4 text-justify">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <MessageCircleQuestion className="h-16 w-16 text-green-300" />
                </div>
                <p className="text-green-800 text-xl">No FAQs available at the moment.</p>
                <p className="mt-2 text-green-600">
                  Our knowledge base is being updated with Ayurvedic wisdom. Please check back soon.
                </p>
              </div>
            )}
            
            <div className="mt-12 text-center border-t border-green-100 pt-6">
              <p className="text-green-700 mb-4">
                Need personalized Ayurvedic guidance or have specific questions?
              </p>
             
              <CustomButton href="/contact">Contact</CustomButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default FAQPage;