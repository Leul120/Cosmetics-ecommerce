import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places']; // Required for Places Autocomplete

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const center = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
};

const ShippingInfo = ({ onSubmit, initialData }) => {
  const [shippingData, setShippingData] = useState(initialData);
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);

  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
    libraries,
  });

  useEffect(() => {
    if (isLoaded && autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
        types: ['geocode'], // Only addresses
        componentRestrictions: { country: 'us' }, // Restrict to specific country if needed
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address;
        const location = place.geometry.location;

        setShippingData((prevData) => ({
          ...prevData,
          address: address,
        }));
        
        // Center the map to the selected address
        setMapCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng(),
        });
      });
    }
  }, [isLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    // Set marker position to where the user clicked
    setMarkerPosition({ lat, lng });

    // Optional: Reverse geocode to get the address from the coordinates (not implemented here)
    // Update state with latitude and longitude
    setShippingData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shippingData);
    onSubmit(shippingData);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div >
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      {/* <div className='flex '> */}
      {/* <section className='home min-h-screen'>

      </section> */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={shippingData.firstName || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={shippingData.lastName || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={shippingData.email || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={shippingData.phoneNumber || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          
          <input
            type="text"
            name="address"
            placeholder="Address"
            ref={autocompleteRef}
            value={shippingData.address || ''}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />

          {/* Map with Draggable Marker */}
          <div className="border p-2 rounded-md mb-4">
            <h3 className="mb-2">Locate your address on the map:</h3>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              <Marker
                position={markerPosition}
                draggable={true}
                onDragEnd={(e) => handleMapClick(e)}
              />
            </GoogleMap>
          </div>

          
         
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Continue to Payment
          </button>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export default ShippingInfo;
