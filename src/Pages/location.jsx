import React, { useState, useEffect } from 'react';
import Map from '../Components/Map';

// Function to truncate address if there are more than 3 commas
const truncateAddress = (address) => {
  const commaCount = address.split(',').length - 1;
  if (commaCount > 3) {
    const parts = address.split(',').slice(0, 4); // Take up to 4 parts
    return parts.join(',');
  }
  return address;
};

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

  useEffect(() => {
    if (location && address) {
      const truncatedAddress = truncateAddress(address);
      const message = `Your current location is ${truncatedAddress}`;
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);

      // Cleanup function to cancel speech on component unmount
      return () => {
        speechSynthesis.cancel();
      };
    }
  }, [location, address]);

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
