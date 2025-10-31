import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  region?: string;
  loading: boolean;
  error?: string;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation not supported',
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get location details
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          setLocation({
            latitude,
            longitude,
            city: data.address?.city || data.address?.town || data.address?.village,
            region: data.address?.state || data.address?.province,
            country: data.address?.country,
            loading: false,
          });
        } catch (error) {
          setLocation({
            latitude,
            longitude,
            loading: false,
            error: 'Could not fetch location details',
          });
        }
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    );
  }, []);

  return location;
};
