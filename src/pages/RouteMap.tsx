import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Pets as PetsIcon,
} from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const mockWalks = [
  {
    id: 1,
    customer: 'John & Luna',
    address: '1234 Park Ave NW, Washington, DC',
    time: '9:00 AM',
    coordinates: { lat: 38.9115, lng: -77.0341 },
  },
  {
    id: 2,
    customer: 'Sarah & Max',
    address: '5678 Wisconsin Ave NW, Washington, DC',
    time: '10:00 AM',
    coordinates: { lat: 38.9583, lng: -77.0835 },
  },
  {
    id: 3,
    customer: 'Mike & Rocky',
    address: '910 Connecticut Ave NW, Washington, DC',
    time: '11:00 AM',
    coordinates: { lat: 38.9047, lng: -77.0366 },
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 38.9072,
  lng: -77.0369,
};

export default function RouteMap() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    calculateRoute();
  }, []);

  const calculateRoute = () => {
    if (!window.google) return;

    const directionsService = new google.maps.DirectionsService();
    const waypoints = mockWalks.slice(1, -1).map(walk => ({
      location: new google.maps.LatLng(walk.coordinates.lat, walk.coordinates.lng),
      stopover: true,
    }));

    directionsService.route(
      {
        origin: new google.maps.LatLng(mockWalks[0].coordinates.lat, mockWalks[0].coordinates.lng),
        destination: new google.maps.LatLng(
          mockWalks[mockWalks.length - 1].coordinates.lat,
          mockWalks[mockWalks.length - 1].coordinates.lng
        ),
        waypoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        }
      }
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Route Map
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Paper sx={{ width: 300, flexShrink: 0 }}>
          <List>
            {mockWalks.map((walk, index) => (
              <Box key={walk.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={walk.customer}
                    secondary={
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon fontSize="small" color="action" />
                          {walk.address}
                        </Box>
                        {walk.time}
                      </>
                    }
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>

        <Paper sx={{ flex: 1 }}>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
              onLoad={onLoad}
            >
              {!directions && mockWalks.map((walk) => (
                <Marker
                  key={walk.id}
                  position={walk.coordinates}
                  title={walk.customer}
                />
              ))}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: '#008080',
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </Paper>
      </Box>
    </Box>
  );
} 