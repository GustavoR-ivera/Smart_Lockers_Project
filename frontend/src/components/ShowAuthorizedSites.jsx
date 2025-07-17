import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./showAuthorizedSites.css";

function ShowAuthorizedSites() {
  return (
    // <div className="container">
    //   <h2>Authorized Sites</h2>
    //   <div className="map">
    <MapContainer
      center={[4.7008594, -74.1176473]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[4.7008594, -74.1176473]}>
        <Popup>CC. Diverplaza</Popup>
      </Marker>
      <Marker position={[4.7008861, -74.1253722]}>
        <Popup>CC. Portal 80</Popup>
      </Marker>
    </MapContainer>
    //   </div>
    // </div>
  );
}

export default ShowAuthorizedSites;
