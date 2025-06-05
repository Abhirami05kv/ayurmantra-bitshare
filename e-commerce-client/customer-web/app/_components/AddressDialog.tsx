"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AddressDialogProps = {
  initialAddress?: {
    id?: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onSave: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
  isLoading?: boolean;
};

function AddressDialog({ initialAddress, onSave, isLoading }: AddressDialogProps) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  
  useEffect(() => {
    if (isDialogOpen) {
      setStreet(initialAddress?.street || "");
      setCity(initialAddress?.city || "");
      setState(initialAddress?.state || "");
      setzipCode(initialAddress?.zipCode || "");
      setCountry(initialAddress?.country || "");
    }
  }, [isDialogOpen, initialAddress]);

  const handleSave = () => {
    onSave({ street, city, state, zipCode, country });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shipping Address</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setzipCode(e.target.value)}
            />
          </div>
          <Button className="w-full bg-green-700 hover:bg-green-600" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddressDialog;