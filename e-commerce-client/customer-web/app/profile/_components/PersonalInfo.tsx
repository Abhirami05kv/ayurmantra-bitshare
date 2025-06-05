import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User } from "lucide-react";
import Cookies from "js-cookie";

interface AddressProps {
  street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    id:string
  }
type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  address: AddressProps[];
  createdAt: string;
};

const faqItems = [
  {
    question: "How do I change my password?",
    answer:
      "Go to Profile, and click on 'Reset Password'. Follow the prompts to update your password.",
  },
  {
    question: "Where can I view my order history?",
    answer:
      "Click on the Orders section in the sidebar to view all your past and current orders.",
  },
  {
    question: "How do I add a new shipping address?",
    answer:
      "Navigate to the Addresses section and click 'Add New Address'. Fill in the required information and save.",
  },
];
function PersonalInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  return (
    <div className="max-w-4xl mx-auto">
      {/* User Info Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Manage your account details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-gray-500" />
            </div>
            <div className="text-center sm:text-left">
              {user ? (
                <>
                  <h3 className="text-lg font-medium">{user?.name}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                  <p className="text-gray-500">Phone: {user?.phoneNumber}</p>
                  {/* <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Edit Profile
                </button> */}
                </>
              ) : (
                <p className="text-gray-500">---</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

export default PersonalInfo;
