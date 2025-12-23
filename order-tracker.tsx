"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import type { Order } from "@/lib/types";

// IMPORTANT: You need to add your Google Maps API key to your environment variables.
// Create a .env.local file in the root of your project and add the following line:
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Helper function for linear interpolation
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function OrderTracker({ order }: { order: Order }) {
  const [driverPosition, setDriverPosition] = useState(order.driverLocation);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const center = useMemo(() => ({
      lat: (order.restaurantLocation.lat + order.userLocation.lat) / 2,
      lng: (order.restaurantLocation.lng + order.userLocation.lng) / 2,
  }), [order.restaurantLocation, order.userLocation]);


  useEffect(() => {
    if (order.status !== 'out-for-delivery') return;

    const totalSteps = 100;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      const lat = lerp(
        order.driverLocation.lat,
        order.userLocation.lat,
        progress
      );
      const lng = lerp(
        order.driverLocation.lng,
        order.userLocation.lng,
        progress
      );

      setDriverPosition({ lat, lng });

      if (step >= totalSteps) {
        clearInterval(interval);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [order]);

  if (!API_KEY) {
    return (
        <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
            <p className="text-center text-muted-foreground p-4">
                Google Maps API Key is missing. <br/> Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.
            </p>
        </div>
    )
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ height: "500px", width: "100%" }}>
        <Map
          defaultCenter={center}
          defaultZoom={14}
          mapId="food-delivery-map"
        >
          {/* Restaurant Marker */}
          <AdvancedMarker position={order.restaurantLocation} title={"Restaurant"}>
            <Pin
              background={"#008080"}
              borderColor={"#006666"}
              glyphColor={"#FFFFFF"}
            >
                <span className="material-icons">restaurant</span>
            </Pin>
          </AdvancedMarker>

          {/* User/Delivery Location Marker */}
          <AdvancedMarker position={order.userLocation} title={"Your Location"}>
            <Pin
              background={"#FFD700"}
              borderColor={"#E6C200"}
              glyphColor={"#000000"}
            >
                 <span className="material-icons">home</span>
            </Pin>
          </AdvancedMarker>
          
          {/* Driver Marker */}
          <AdvancedMarker
            position={driverPosition}
            title={"Driver"}
            onClick={() => setInfoWindowOpen(true)}
          >
            <Pin
                background={"#333333"}
                borderColor={"#000000"}
                glyphColor={"#FFFFFF"}
            >
                <span className="material-icons">local_shipping</span>
            </Pin>
          </AdvancedMarker>

          {infoWindowOpen && (
            <InfoWindow
              position={driverPosition}
              onCloseClick={() => setInfoWindowOpen(false)}
            >
              <p>Your order is on the way!</p>
            </InfoWindow>
          )}

        </Map>
      </div>
    </APIProvider>
  );
}
