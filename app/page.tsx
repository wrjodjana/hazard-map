import Map from "pages/map";
import Sidebar from "components/sidebar";

export default function Page() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Map />
    </div>
  );
}
