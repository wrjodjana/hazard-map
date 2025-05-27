export interface EarthquakeData {
  latitude: number;
  longitude: number;
  name: string;
  magnitude: number;
}

export interface ProvinceBounds {
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
}

export const fetchEarthquake = async (year: string, bounds: ProvinceBounds): Promise<EarthquakeData[] | null> => {
  const start_date = `${year}-01-01`;
  const end_date = `${year}-12-31`;

  const params = new URLSearchParams({
    format: "geojson",
    starttime: start_date,
    endtime: end_date,
    minlatitude: bounds.min_lat.toString(),
    maxlatitude: bounds.max_lat.toString(),
    minlongitude: bounds.min_lon.toString(),
    maxlongitude: bounds.max_lon.toString(),
    limit: "10",
  });

  const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${params}`);
  const data = await response.json();

  const earthquakes: EarthquakeData[] = data.features.map((features: any) => ({
    latitude: features.geometry.coordinates[1],
    longitude: features.geometry.coordinates[0],
    name: features.properties.place,
    magnitude: features.properties.mag,
  }));

  return earthquakes;
};
