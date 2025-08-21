// AdLocationMap.jsx
import React from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AdLocationMap = ({ lat, lng, radius }) => {
  return (<>
		<h1 style={{padding: "1rem 0rem 1rem 0rem"}}>AD posted from</h1>
    <MapContainer center={[lat, lng]} zoom={12} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[lat, lng]}
        radius={radius} 
        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
      />
    </MapContainer>
		</>
  );
};

export default AdLocationMap;
