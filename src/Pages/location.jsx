import React, { useState, useEffect } from 'react';
import Map from '../Components/Map';

// hello location
const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, [navigator.geolocation]);

  return (
    <div>
      <h1 className="text-2xl font-bold my-3 uppercase">Current Location</h1>
      {error && <p>Error: {error}</p>}
      {location ? (
        <div>
          <p className="text-xl w-1/2 mx-auto">
            <b>Latitude:</b> {location.latitude}<br />
            <b>Longitude:</b> {location.longitude}<br/>
            <b>Address:</b> {address}
          </p>
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            address={address}
            setAddress={setAddress}
          />
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default Location;
