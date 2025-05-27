"use client";

import Map from "pages/map";
import Sidebar from "components/sidebar";
import { useState, useEffect } from "react";
import { fetchEarthquake, EarthquakeData, ProvinceBounds } from "services/earthquakes";
import { ProvinceData, provinces } from "components/sidebar/selectprovince";

export default function Page() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData[]>([]);

  useEffect(() => {
    const loadEarthquakes = async () => {
      if (selectedProvince && selectedYear && selectedEvent === "Earthquakes") {
        const provinceData = provinces.find((p) => p.province === selectedProvince);

        if (provinceData) {
          const bounds = {
            min_lat: provinceData.min_lat,
            max_lat: provinceData.max_lat,
            min_lon: provinceData.min_lon,
            max_lon: provinceData.max_lon,
          };

          const data = await fetchEarthquake(selectedYear, bounds);
          setEarthquakeData(data || []);
        }
      } else {
        setEarthquakeData([]);
      }
    };
    loadEarthquakes();
  }, [selectedProvince, selectedEvent, selectedYear]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onProvinceChange={setSelectedProvince} onYearChange={setSelectedYear} onEventChange={setSelectedEvent} />
      <Map earthquakeData={earthquakeData} />
    </div>
  );
}
