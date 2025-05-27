"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoid2FycmpvZGphbmEiLCJhIjoiY21iNW1tM29uMWpxbDJpb244czh2MXRpNiJ9.06O9vRK6j9D4xZALht2Vmw";
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.0242, 40.6941],
        zoom: 10,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return <div ref={mapContainerRef} style={{ flex: 1, height: "100vh" }}></div>;
}
