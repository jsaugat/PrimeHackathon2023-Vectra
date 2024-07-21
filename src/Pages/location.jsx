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
    <div style={{height:"100%"}} >
      {error && <p>Error: {error}</p>}
      {location ? (
         
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            address={address}
            setAddress={setAddress}
          />
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default Location;
