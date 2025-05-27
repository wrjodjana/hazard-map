import SelectProvince from "./sidebar/selectprovince";
import SelectYear from "./sidebar/selectyear";
import SelectEvent from "./sidebar/selectevent";

interface SidebarProps {
  onProvinceChange: (province: string) => void;
  onYearChange: (year: string) => void;
  onEventChange: (event: string) => void;
}

export default function Sidebar({ onProvinceChange, onYearChange, onEventChange }: SidebarProps) {
  return (
    <div style={{ width: "25%", height: "100vh", backgroundColor: "#FFFFFF", padding: "20px" }}>
      <h3>Select a Province</h3>
      <SelectProvince onProvinceChange={onProvinceChange} />
      <h3>Select year</h3>
      <SelectYear onYearChange={onYearChange} />
      <h3>Select event</h3>
      <SelectEvent onEventChange={onEventChange} />
    </div>
  );
}
