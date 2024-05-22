import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export function Map(center: { lat: number; lng: number }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
      <Marker position={center} />
    </GoogleMap>
  );
}
