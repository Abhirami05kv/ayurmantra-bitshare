"use client";
import React, { useState } from "react";

export function DualThumbRangeSlider() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${minValue}%`,
            right: `${100 - maxValue}%`,
          }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none top-0 left-0 z-10"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none top-0 left-0 z-20"
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>
    </div>
  );
}