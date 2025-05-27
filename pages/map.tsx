"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { EarthquakeData } from "services/earthquakes";

interface MapProps {
  earthquakeData: EarthquakeData[];
}

export default function Map({ earthquakeData }: MapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoid2FycmpvZGphbmEiLCJhIjoiY21iNW1tM29uMWpxbDJpb244czh2MXRpNiJ9.06O9vRK6j9D4xZALht2Vmw";
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [113.9213, 0.7893],
        zoom: 5,
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    earthquakeData.forEach((earthquake) => {
      const circleElement = document.createElement("div");
      circleElement.style.width = "12px";
      circleElement.style.height = "12px";
      circleElement.style.borderRadius = "50%";
      circleElement.style.backgroundColor = "#ff0000";
      circleElement.style.cursor = "pointer";

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <strong>${earthquake.name}</strong><br>
      Magnitude: ${earthquake.magnitude}
    `);

      const marker = new mapboxgl.Marker(circleElement).setLngLat([earthquake.longitude, earthquake.latitude]).setPopup(popup).addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [earthquakeData]);

  return <div ref={mapContainerRef} style={{ flex: 1, height: "100vh" }}></div>;
}
