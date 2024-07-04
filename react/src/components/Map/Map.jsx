import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// const MapContainer = ({ latitude, longitude, popup }) => {
// const position = [latitude || 40.7128, longitude || -74.006];
const MapContainer = ({ popup }) => {
  const position = [30.0566, 31.3301];

  return (
    <LeafletMap center={position} zoom={12}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position}>
        <Popup>{popup}</Popup>
      </Marker>
    </LeafletMap>
  );
};

export default MapContainer;
