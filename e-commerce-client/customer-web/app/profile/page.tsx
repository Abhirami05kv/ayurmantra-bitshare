"use client";
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import PersonalInfo from './_components/PersonalInfo';
import SidebarContent from './_components/SidebarContent';
import OrderHistory from './_components/OrderHistory';
import Giftcards from './_components/Giftcards';

const ProfilePage = () => {
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
console.log(activeComponent);

  const handleSidebarClick = (label: string) => {
    setActiveComponent(label);
    setIsSheetOpen(false); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <h1 className="text-xl font-semibold">Profile</h1>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[320px]">
            <VisuallyHidden>
              <SheetTitle>Profile Menu</SheetTitle>
            </VisuallyHidden>
            <SidebarContent onItemClick={handleSidebarClick} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-64 bg-white border-r min-h-screen">
          <SidebarContent onItemClick={handleSidebarClick} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
        {activeComponent === "Profile" && <PersonalInfo />}
          {activeComponent === "Orders" && <OrderHistory />}
          {activeComponent === "Giftcards" && <Giftcards />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;