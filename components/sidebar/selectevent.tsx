import event_data from "data/event.json";
import { useState } from "react";

const event = event_data;

interface SelectEventProps {
  onEventChange: (event: string) => void;
}

export default function SelectEvent({ onEventChange }: SelectEventProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

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

  const handleEventChange = (event: string) => {
    setSelectedEvent(event);
    setInputValue(event);
    setInputOpen(false);
    onEventChange(event);
  };

  let filterEvents;

  if (inputValue.length > 0) {
    filterEvents = event.filter((event) => event.toLowerCase().includes(inputValue.toLowerCase()));
  } else {
    filterEvents = event;
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />
      {inputOpen && (
        <div style={{ height: "150px", overflowY: "scroll" }}>
          {filterEvents.map((event, index) => (
            <div key={index} onClick={() => handleEventChange(event)}>
              {event}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
