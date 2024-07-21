import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Map = ({ latitude, longitude, address, setAddress }) => {
  const [position, setPosition] = useState([latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);

      // Fetch address using reverse geocoding
      axios
        .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
        .then((response) => {
          const address = response.data.display_name;
          setAddress(address);
          console.log("address", address);
        })
        .catch((error) => {
          console.error('Error fetching address:', error);
        });
    }
  }, [latitude, longitude, setAddress]);

  return (
    <MapContainer center={position} zoom={23} style={{ height: '100vh', width: '95%', margin: "auto", marginTop: "1rem", marginBottom: "3rem", borderRadius: "1.2rem" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {address ? address : 'Fetching address...'}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
