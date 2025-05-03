import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Pets as PetsIcon,
  Schedule as ScheduleIcon,
  Route as RouteIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const summaryCards = [
  {
    title: "Today's Walks",
    value: '8',
    icon: <PetsIcon sx={{ fontSize: 40 }} />, 
    color: '#4CAF50',
  },
  {
    title: 'Active Customers',
    value: '24',
    icon: <ScheduleIcon sx={{ fontSize: 40 }} />, 
    color: '#2196F3',
  },
  {
    title: 'Total Distance',
    value: '5.2 mi',
    icon: <RouteIcon sx={{ fontSize: 40 }} />, 
    color: '#FF9800',
  },
  {
    title: 'Weekly Earnings',
    value: '$840',
    icon: <MoneyIcon sx={{ fontSize: 40 }} />, 
    color: '#009688',
  },
];

const home = {
  id: 0,
  customer: 'Home (Dupont Circle)',
  address: 'Dupont Circle, Washington, DC',
  time: '8:30 AM',
  coordinates: { lat: 38.9096, lng: -77.0434 },
};

const mockWalks = [
  home,
  {
    id: 1,
    customer: 'John & Luna',
    address: '1234 19th St NW, Washington, DC',
    time: '9:00 AM',
    coordinates: { lat: 38.9087, lng: -77.0425 },
  },
  {
    id: 2,
    customer: 'Sarah & Max',
    address: '1812 N St NW, Washington, DC',
    time: '9:30 AM',
    coordinates: { lat: 38.9092, lng: -77.0421 },
  },
  {
    id: 3,
    customer: 'Mike & Rocky',
    address: '1500 Massachusetts Ave NW, Washington, DC',
    time: '10:00 AM',
    coordinates: { lat: 38.9098, lng: -77.0340 },
  },
  {
    id: 4,
    customer: 'Emma & Daisy',
    address: '2000 P St NW, Washington, DC',
    time: '10:30 AM',
    coordinates: { lat: 38.9105, lng: -77.0457 },
  },
  {
    id: 5,
    customer: 'Alex & Buddy',
    address: '1700 Q St NW, Washington, DC',
    time: '11:00 AM',
    coordinates: { lat: 38.9112, lng: -77.0398 },
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = home.coordinates;

export default function Dashboard() {
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
        optimizeWaypoints: false,
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
        Dashboard
      </Typography>
      <Grid container spacing={3} mb={4}>
        {summaryCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: `${card.color}15`,
                  color: card.color,
                  mb: 1,
                }}
              >
                {card.icon}
              </Box>
              <Typography variant="h4" component="div">
                {card.value}
              </Typography>
              <Typography color="text.secondary" variant="subtitle1">
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        {/* Left: Schedule */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            Today's Schedule
          </Typography>
          {mockWalks.map((walk, idx) => (
            <Paper
              key={walk.id}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'white',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  minWidth: 100,
                  borderRight: '1px solid #eee',
                  pr: 2,
                }}
              >
                <Typography variant="h6" color={idx === 0 ? 'secondary' : 'primary'}>
                  {walk.time}
                </Typography>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1" fontWeight={idx === 0 ? 'bold' : 'normal'}>
                  {walk.customer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {walk.address}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Grid>
        {/* Right: Map */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom>
            Route Map
          </Typography>
          <Paper sx={{ p: 2, height: '100%' }}>
            <LoadScript googleMapsApiKey="AIzaSyALOwfXriSj-3yLPLC1ovRphxzWe13jNhA">
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
        </Grid>
      </Grid>
    </Box>
  );
} 