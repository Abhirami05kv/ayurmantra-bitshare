import React from "react";

interface GoogleMapViewProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: string;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({}) => {
  return <div style={{}} />;
};
