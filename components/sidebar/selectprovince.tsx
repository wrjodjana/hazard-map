import province_data from "data/province.json";
import { useState } from "react";

export interface ProvinceData {
  province: string;
  min_lat: number;
  max_lat: number;
  min_lon: number;
  max_lon: number;
}

export const provinces: ProvinceData[] = province_data;

interface SelectProvinceProps {
  onProvinceChange: (province: string) => void;
}

export default function SelectProvince({ onProvinceChange }: SelectProvinceProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setInputOpen(true);
  };

  const handleInputFocus = () => {
    setInputOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setInputOpen(false), 200);
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setInputValue(province);
    setInputOpen(false);
    onProvinceChange(province);
  };

  let filterProvinces;

  if (inputValue.length > 0) {
    filterProvinces = provinces.filter((province) => province.province.toLowerCase().includes(inputValue.toLowerCase()));
  } else {
    filterProvinces = provinces;
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />
      {inputOpen && (
        <div style={{ height: "150px", overflowY: "scroll" }}>
          {filterProvinces.map((province, index) => (
            <div key={index} onClick={() => handleProvinceChange(province.province)}>
              {province.province}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
