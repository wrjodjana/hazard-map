import year_data from "data/year.json";
import { useState } from "react";

const year = year_data;

interface SelectYearProps {
  onYearChange: (year: string) => void;
}

export default function SelectYear({ onYearChange }: SelectYearProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

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

  const handleYearChange = (year: number) => {
    setSelectedYear(year.toString());
    setInputValue(year.toString());
    setInputOpen(false);
    onYearChange(year.toString());
  };

  let filterYears;

  if (inputValue.length > 0) {
    filterYears = year.filter((year) => year.toString().includes(inputValue));
  } else {
    filterYears = year;
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />
      {inputOpen && (
        <div style={{ height: "150px", overflowY: "scroll" }}>
          {filterYears.map((year, index) => (
            <div key={index} onClick={() => handleYearChange(year)}>
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
