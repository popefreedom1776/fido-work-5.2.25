import { Grid, Paper, Typography, Box, Avatar, Button, Modal, Fade, Backdrop, Divider, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';
import {
  Pets as PetsIcon,
  Schedule as ScheduleIcon,
  Route as RouteIcon,
  AttachMoney as MoneyIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useCallback, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Marker } from 'react-map-gl';

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
  name: 'Home (Dupont Circle)',
  address: 'Dupont Circle, Washington, DC',
  time: '8:30 AM',
  coordinates: { lat: 38.9096, lng: -77.0434 },
};

// Extend Dog type for gamification and profile
interface Dog {
  id: number;
  name: string;
  owner: string;
  ownerCell: string;
  ownerEmail: string;
  address: string;
  time: string;
  coordinates: { lat: number; lng: number };
  walkType: 'individual' | 'group';
  breed: string;
  age: number;
  temperament: string;
  walkTime: '30min' | '60min';
  notes: string;
  photoUrl?: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  loyalty: number; // 0-5 stars
  perWalkRevenue: number;
  totalRevenue: number;
}

const dogs: Dog[] = [
  {
    id: 1,
    name: 'Luna',
    owner: 'John',
    ownerCell: '555-123-4567',
    ownerEmail: 'john@example.com',
    address: '1234 19th St NW, Washington, DC',
    time: '9:00 AM',
    coordinates: { lat: 38.9087, lng: -77.0425 },
    walkType: 'individual',
    breed: 'Golden Retriever',
    age: 3,
    temperament: 'Friendly',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 2,
    xp: 12,
    xpToNext: 20,
    streak: 3,
    loyalty: 4,
    perWalkRevenue: 20,
    totalRevenue: 240,
  },
  {
    id: 2,
    name: 'Max',
    owner: 'Sarah',
    ownerCell: '555-234-5678',
    ownerEmail: 'sarah@example.com',
    address: '1812 N St NW, Washington, DC',
    time: '9:30 AM',
    coordinates: { lat: 38.9092, lng: -77.0421 },
    walkType: 'group',
    breed: 'German Shepherd',
    age: 2,
    temperament: 'Energetic',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 1,
    xp: 5,
    xpToNext: 10,
    streak: 1,
    loyalty: 3,
    perWalkRevenue: 18,
    totalRevenue: 90,
  },
  {
    id: 3,
    name: 'Rocky',
    owner: 'Mike',
    ownerCell: '555-345-6789',
    ownerEmail: 'mike@example.com',
    address: '1500 Massachusetts Ave NW, Washington, DC',
    time: '10:00 AM',
    coordinates: { lat: 38.9098, lng: -77.0340 },
    walkType: 'individual',
    breed: 'Labrador',
    age: 4,
    temperament: 'Calm',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 3,
    xp: 25,
    xpToNext: 40,
    streak: 5,
    loyalty: 5,
    perWalkRevenue: 22,
    totalRevenue: 330,
  },
  {
    id: 4,
    name: 'Daisy',
    owner: 'Emma',
    ownerCell: '555-456-7890',
    ownerEmail: 'emma@example.com',
    address: '2000 P St NW, Washington, DC',
    time: '10:30 AM',
    coordinates: { lat: 38.9105, lng: -77.0457 },
    walkType: 'individual',
    breed: 'Poodle',
    age: 2,
    temperament: 'Shy',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 1,
    xp: 3,
    xpToNext: 10,
    streak: 1,
    loyalty: 2,
    perWalkRevenue: 19,
    totalRevenue: 38,
  },
  {
    id: 5,
    name: 'Buddy',
    owner: 'Alex',
    ownerCell: '555-567-8901',
    ownerEmail: 'alex@example.com',
    address: '1700 Q St NW, Washington, DC',
    time: '11:00 AM',
    coordinates: { lat: 38.9112, lng: -77.0398 },
    walkType: 'group',
    breed: 'Beagle',
    age: 1,
    temperament: 'Playful',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 1,
    xp: 2,
    xpToNext: 10,
    streak: 0,
    loyalty: 1,
    perWalkRevenue: 15,
    totalRevenue: 15,
  },
  // New dogs for more visual variety
  {
    id: 6,
    name: 'Bella',
    owner: 'Olivia',
    ownerCell: '555-678-9012',
    ownerEmail: 'olivia@example.com',
    address: '1600 S St NW, Washington, DC',
    time: '11:30 AM',
    coordinates: { lat: 38.9118, lng: -77.0360 },
    walkType: 'group',
    breed: 'Corgi',
    age: 2,
    temperament: 'Energetic',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 2,
    xp: 8,
    xpToNext: 15,
    streak: 2,
    loyalty: 3,
    perWalkRevenue: 17,
    totalRevenue: 51,
  },
  {
    id: 7,
    name: 'Charlie',
    owner: 'Lucas',
    ownerCell: '555-789-0123',
    ownerEmail: 'lucas@example.com',
    address: '1400 17th St NW, Washington, DC',
    time: '12:00 PM',
    coordinates: { lat: 38.9125, lng: -77.0375 },
    walkType: 'individual',
    breed: 'Shih Tzu',
    age: 5,
    temperament: 'Calm',
    walkTime: '60min',
    notes: '',
    photoUrl: '',
    level: 4,
    xp: 30,
    xpToNext: 50,
    streak: 6,
    loyalty: 4,
    perWalkRevenue: 25,
    totalRevenue: 200,
  },
  {
    id: 8,
    name: 'Milo',
    owner: 'Sophia',
    ownerCell: '555-890-1234',
    ownerEmail: 'sophia@example.com',
    address: '1800 16th St NW, Washington, DC',
    time: '12:30 PM',
    coordinates: { lat: 38.9132, lng: -77.0350 },
    walkType: 'group',
    breed: 'French Bulldog',
    age: 3,
    temperament: 'Playful',
    walkTime: '30min',
    notes: '',
    photoUrl: '',
    level: 2,
    xp: 10,
    xpToNext: 18,
    streak: 3,
    loyalty: 2,
    perWalkRevenue: 18,
    totalRevenue: 54,
  },
  {
    id: 9,
    name: 'Sadie',
    owner: 'Mason',
    ownerCell: '555-901-2345',
    ownerEmail: 'mason@example.com',
    address: '1900 15th St NW, Washington, DC',
    time: '1:00 PM',
    coordinates: { lat: 38.9140, lng: -77.0320 },
    walkType: 'individual',
    breed: 'Boxer',
    age: 4,
    temperament: 'Timid',
    walkTime: '60min',
    notes: '',
    photoUrl: '',
    level: 3,
    xp: 20,
    xpToNext: 35,
    streak: 4,
    loyalty: 5,
    perWalkRevenue: 23,
    totalRevenue: 92,
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = home.coordinates;

// Pre-generated base64 PNGs for numbers 1-5
const markerPngs = [
  '', // index 0 unused
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAABn5+...1',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAABn5+...2',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAABn5+...3',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAABn5+...4',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAABn5+...5',
];

// Helper: group dogs by time
const dogsByTime = dogs.reduce((acc, dog) => {
  if (!acc[dog.time]) acc[dog.time] = [];
  acc[dog.time].push(dog);
  return acc;
}, {} as Record<string, Dog[]>);
const sortedTimes = Object.keys(dogsByTime).sort();

type DogsByTimeType = Record<string, Dog[]>;

// Helper to extract street name from address
const getStreetName = (address: string) => address.split(',')[0];

// Temporary: List of escape artist dog names (should be replaced with real data integration)
const escapeArtistNames = ['Luna'];

// Helper: generate SVG marker icon with a number
function createNumberedMarkerIcon(number: number) {
  const svg = `
    <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='24' cy='24' r='22' fill='#008080' stroke='#fff' stroke-width='4'/>
      <text x='24' y='32' text-anchor='middle' font-size='24' font-family='Arial' font-weight='bold' fill='#fff'>${number}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoicG9wZWZyZWVkb20iLCJhIjoiY205amd6Zm1lMGF0czJxcTJmOGJsd3gybiJ9.mXo-NdnL09HqQ0kbBWg8kQ';

// Color palette for dog stops
const stopColors = [
  '#1976d2', // blue
  '#ff9800', // orange
  '#43a047', // green
  '#8e24aa', // purple
  '#e53935', // red
  '#00bcd4', // teal
  '#fbc02d', // yellow
  '#6d4c41', // brown
];

function Dashboard() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [dogsByTimeState, setDogsByTimeState] = useState<DogsByTimeType>(dogsByTime);
  const [sortedTimesState, setSortedTimesState] = useState<string[]>(sortedTimes);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [dogWalkCounts] = useState<Record<number, number>>({
    1: 12, // Luna
    2: 8,  // Max
    3: 15, // Rocky
    4: 10, // Daisy
    5: 5,  // Buddy
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');
  const [tempTemperament, setTempTemperament] = useState<string>('');
  const [tempWalkTime, setTempWalkTime] = useState<'30min' | '60min'>('30min');
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [routeGeoJson, setRouteGeoJson] = useState<any>(null);
  const [legDurations, setLegDurations] = useState<number[]>([]); // in seconds
  const [selectedStopIdx, setSelectedStopIdx] = useState(0); // for interactive route highlight
  const [routeMode, setRouteMode] = useState<'full' | 'single'>('full');

  // Drag and drop handler
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceTime = sortedTimesState[Number(source.droppableId)];
    const destTime = sortedTimesState[Number(destination.droppableId)];
    const newDogsByTime = { ...dogsByTimeState };
    const draggedDog = newDogsByTime[sourceTime][source.index];
    const destDogs = newDogsByTime[destTime];
    // Business rule: prevent grouping individual dogs
    if (
      (draggedDog.walkType === 'individual' && destDogs.length > 0) ||
      destDogs.some((dog) => dog.walkType === 'individual')
    ) {
      setErrorMsg('This dog is set to do only individual walks.');
      return;
    }
    const [removed] = newDogsByTime[sourceTime].splice(source.index, 1);
    newDogsByTime[destTime].splice(destination.index, 0, removed);
    setDogsByTimeState(newDogsByTime);
  };

  // Calculate Euclidean distance
  const getDistance = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
    return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
  };

  // Auto Schedule: sort all dogs by distance from home, regroup into timeslots
  const handleAutoSchedule = () => {
    // Flatten all dogs
    const allDogs = Object.values(dogsByTimeState).flat();
    // Sort by distance from home
    allDogs.sort((a, b) => getDistance(a.coordinates, home.coordinates) - getDistance(b.coordinates, home.coordinates));
    // For demo, assign 2 dogs per timeslot
    const newDogsByTime: typeof dogsByTimeState = {};
    let slot = 0;
    for (let i = 0; i < allDogs.length; i++) {
      const time = sortedTimesState[slot % sortedTimesState.length];
      if (!newDogsByTime[time]) newDogsByTime[time] = [];
      newDogsByTime[time].push(allDogs[i]);
      slot++;
    }
    setDogsByTimeState(newDogsByTime);
  };

  // Helper: get ordered list of stops from current schedule
  const getOrderedStops = () => {
    // Flatten dogsByTimeState in the order of sortedTimesState
    return sortedTimesState.flatMap(time => dogsByTimeState[time] || []);
  };

  // Helper: get coordinates for all stops in order
  const getRouteCoordinates = () => {
    const stops = [home, ...getOrderedStops()];
    return stops.map(stop => [stop.coordinates.lng, stop.coordinates.lat]);
  };

  // Helper: get color for a stop index
  const getStopColor = (idx: number) => stopColors[idx % stopColors.length];

  // Fetch route from Mapbox Directions API and split into N segments for N dogs
  useEffect(() => {
    const stops = [home, ...getOrderedStops()];
    const fetchSegment = async (start: any, end: any) => {
      const coordsStr = `${start.coordinates.lng},${start.coordinates.lat};${end.coordinates.lng},${end.coordinates.lat}`;
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coordsStr}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes[0]) {
          return {
            coordinates: data.routes[0].geometry.coordinates,
            duration: data.routes[0].legs[0].duration
          };
        }
      } catch (error) {
        console.error('Error fetching segment:', error);
      }
      return null;
    };

    const fetchAllSegments = async () => {
      const segments = [];
      const durations = [];
      
      // Fetch each segment separately
      for (let i = 0; i < stops.length - 1; i++) {
        const segment = await fetchSegment(stops[i], stops[i + 1]);
        if (segment) {
          segments.push(segment.coordinates);
          durations.push(segment.duration);
        }
      }
      
      setLegDurations(durations);
      setRouteGeoJson(segments);
    };

    fetchAllSegments();
  }, [home, dogsByTimeState, sortedTimesState]);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    mapboxgl.accessToken = MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [center.lng, center.lat],
      zoom: 13,
    });

    // Add home marker
    new mapboxgl.Marker({ color: 'green' })
      .setLngLat([home.coordinates.lng, home.coordinates.lat])
      .addTo(mapRef.current);

    // Add a single persistent route source and layers
    mapRef.current.on('load', () => {
      if (!mapRef.current!.getSource('route')) {
        mapRef.current!.addSource('route', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });
      }
      // Outline layer
      if (!mapRef.current!.getLayer('route-outline')) {
        mapRef.current!.addLayer({
          id: 'route-outline',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#fff',
            'line-width': 11,
          },
        });
      }
      // Main color layer
      if (!mapRef.current!.getLayer('route-main')) {
        mapRef.current!.addLayer({
          id: 'route-main',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1976d2',
            'line-width': 7,
          },
        });
      }
    });
  }, [center, home, getOrderedStops]);

  // Robust marker management: clear old markers, add new, always update highlighting and click
  useEffect(() => {
    if (!mapRef.current) return;
    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    // Add numbered markers for each stop, with color
    getOrderedStops().forEach((dog, idx) => {
      const el = document.createElement('div');
      el.style.background = getStopColor(idx);
      el.style.color = 'white';
      el.style.borderRadius = '50%';
      el.style.width = '36px';
      el.style.height = '36px';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '18px';
      el.style.border = (idx === selectedStopIdx && routeMode === 'single') ? '4px solid #1976d2' : '2px solid white';
      el.innerText = String(idx + 1);
      el.style.cursor = 'pointer';
      el.onclick = () => {
        setRouteMode('single');
        setSelectedStopIdx(idx);
      };
      const marker = new mapboxgl.Marker(el)
        .setLngLat([dog.coordinates.lng, dog.coordinates.lat])
        .addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [dogsByTimeState, sortedTimesState, selectedStopIdx, routeMode]);

  // Draw the route line: update the single source data only
  useEffect(() => {
    if (!mapRef.current || !routeGeoJson) return;
    const map = mapRef.current;
    let data: any = { type: 'FeatureCollection', features: [] };
    
    if (routeMode === 'full') {
      // MultiLineString for all segments
      const allCoords = routeGeoJson.filter((seg: any) => seg && seg.length >= 2);
      if (allCoords.length > 0) {
        data = {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: allCoords,
          },
        };
      }
    } else if (routeMode === 'single') {
      let idx = selectedStopIdx;
      if (idx < 0) idx = 0;
      if (idx >= routeGeoJson.length) idx = routeGeoJson.length - 1;
      
      // Get the segment from previous stop to current stop
      const segment = routeGeoJson[idx];
      console.log('Selected segment index:', idx);
      console.log('Selected segment:', segment);
      
      if (segment && segment.length >= 2) {
        data = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: segment,
          },
          properties: {
            color: getStopColor(idx),
          },
        };
      }
    }
    
    // Update the source data
    if (map.getSource('route')) {
      console.log('Updating route data:', data);
      (map.getSource('route') as mapboxgl.GeoJSONSource).setData(data);
    }
  }, [routeGeoJson, selectedStopIdx, routeMode]);

  // Update the route layer color based on the selected segment
  useEffect(() => {
    if (!mapRef.current || routeMode !== 'single') return;
    const map = mapRef.current;
    if (map.getLayer('route-main')) {
      const color = getStopColor(selectedStopIdx);
      console.log('Setting route color to:', color);
      map.setPaintProperty('route-main', 'line-color', color);
    }
  }, [selectedStopIdx, routeMode]);

  // Handler to update walkType from modal
  const handleWalkTypeChange = (dogId: number, newType: 'individual' | 'group') => {
    // Update in dogsByTimeState
    const newDogsByTime = { ...dogsByTimeState };
    Object.keys(newDogsByTime).forEach(time => {
      newDogsByTime[time] = newDogsByTime[time].map(dog =>
        dog.id === dogId ? { ...dog, walkType: newType } : dog
      );
    });
    setDogsByTimeState(newDogsByTime);
    // Update selectedDog
    if (selectedDog && selectedDog.id === dogId) {
      setSelectedDog({ ...selectedDog, walkType: newType });
    }
  };

  useEffect(() => {
    if (selectedDog) {
      setNotesDraft(selectedDog.notes || '');
      setTempTemperament(selectedDog.temperament || 'Normal');
      setTempWalkTime(selectedDog.walkTime || '30min');
    }
  }, [selectedDog]);

  // Handler to update temperament
  const handleTemperamentChange = (dogId: number, newTemp: string) => {
    const newDogsByTime = { ...dogsByTimeState };
    Object.keys(newDogsByTime).forEach(time => {
      newDogsByTime[time] = newDogsByTime[time].map(dog =>
        dog.id === dogId ? { ...dog, temperament: newTemp } : dog
      );
    });
    setDogsByTimeState(newDogsByTime);
    if (selectedDog && selectedDog.id === dogId) {
      setSelectedDog({ ...selectedDog, temperament: newTemp });
    }
    setTempTemperament(newTemp);
  };

  // Handler to update walk time
  const handleWalkTimeChange = (dogId: number, newTime: '30min' | '60min') => {
    const newDogsByTime = { ...dogsByTimeState };
    Object.keys(newDogsByTime).forEach(time => {
      newDogsByTime[time] = newDogsByTime[time].map(dog =>
        dog.id === dogId ? { ...dog, walkTime: newTime } : dog
      );
    });
    setDogsByTimeState(newDogsByTime);
    if (selectedDog && selectedDog.id === dogId) {
      setSelectedDog({ ...selectedDog, walkTime: newTime });
    }
    setTempWalkTime(newTime);
  };

  // Handler to update notes
  const handleNotesChange = (dogId: number, newNotes: string) => {
    const newDogsByTime = { ...dogsByTimeState };
    Object.keys(newDogsByTime).forEach(time => {
      newDogsByTime[time] = newDogsByTime[time].map(dog =>
        dog.id === dogId ? { ...dog, notes: newNotes } : dog
      );
    });
    setDogsByTimeState(newDogsByTime);
    if (selectedDog && selectedDog.id === dogId) {
      setSelectedDog({ ...selectedDog, notes: newNotes });
    }
    setNotesDraft(newNotes);
  };

  // Helper: parse time string (e.g., '8:30 AM') to Date
  function parseTimeString(timeStr: string) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  // Helper: format Date to time string (e.g., '9:15 AM')
  function formatTime(date: Date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  // Compute truly dynamic schedule: leave-home time is first dog's scheduled walk time minus commute to first dog
  let firstDogTime: Date | null = null;
  let allDogsFlat: Dog[] = [];
  sortedTimesState.forEach((time) => {
    (dogsByTimeState[time] || []).forEach((dog) => {
      allDogsFlat.push(dog);
    });
  });
  if (allDogsFlat.length > 0) {
    firstDogTime = parseTimeString(allDogsFlat[0].time);
  }
  // Leave-home time = first dog time - commute to first dog
  let leaveHomeTime = firstDogTime ? new Date(firstDogTime.getTime() - (legDurations[0] || 0) * 1000) : new Date();
  // Now, build the dynamic schedule
  let runningTime = new Date(leaveHomeTime);
  const expectedArrivalTimes: string[] = [];
  const commuteTimes: number[] = [];
  const walkTimes: number[] = [];
  for (let i = 0; i < allDogsFlat.length; i++) {
    // Commute to this dog
    const commute = legDurations[i] || 0;
    commuteTimes.push(commute);
    runningTime = new Date(runningTime.getTime() + commute * 1000);
    // Arrival time is max of scheduled walk time and arrival
    const scheduled = parseTimeString(allDogsFlat[i].time);
    if (runningTime < scheduled) runningTime = new Date(scheduled);
    expectedArrivalTimes.push(formatTime(runningTime));
    // Walk time
    const walkMins = allDogsFlat[i].walkTime === '60min' ? 60 : 30;
    walkTimes.push(walkMins);
    runningTime = new Date(runningTime.getTime() + walkMins * 60 * 1000);
  }

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              Today's Schedule
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAutoSchedule}>
              Auto Schedule
            </Button>
          </Box>
          {/* Home */}
          <Paper
            key={home.id}
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
              <Typography variant="h6" color="secondary">
                {formatTime(leaveHomeTime)}
              </Typography>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {home.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {home.address}
              </Typography>
            </Box>
          </Paper>
          {/* Dogs grouped by timeslot with drag-and-drop */}
          <DragDropContext onDragEnd={onDragEnd}>
            {sortedTimesState.map((time, droppableIdx) => (
              <div key={time}>
                {/* Commute time from previous stop (or from home for first dog) */}
                {dogsByTimeState[time]?.map((dog, idx) => {
                  const dogIdx = sortedTimesState.slice(0, droppableIdx).reduce((acc, t) => acc + (dogsByTimeState[t]?.length || 0), 0) + idx;
                  // Show commute time for first dog or if not the first timeslot
                  if (dogIdx === 0 || (idx === 0 && droppableIdx > 0)) {
                    return (
                      <Box key={dog.id + '-commute'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 0.5 }}>
                        <Box sx={{ height: 1, width: 24, bgcolor: '#bbb', mx: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          {Math.round(commuteTimes[dogIdx] / 60)} min commute
                        </Typography>
                        <Box sx={{ height: 1, width: 24, bgcolor: '#bbb', mx: 1 }} />
                      </Box>
                    );
                  }
                  return null;
                })}
                <Paper
                  sx={{ p: 1.2, mb: 1.2, bgcolor: 'background.default' }}
                  elevation={0}
                >
                  <Box sx={{ minWidth: 100, borderRight: '1px solid #eee', pr: 2, mb: 1 }}>
                    <Typography variant="h6" color="primary" sx={{ fontSize: 18 }}>{time}</Typography>
                  </Box>
                  <Droppable droppableId={String(droppableIdx)} direction="horizontal">
                    {(provided) => (
                      <Box sx={{ display: 'flex', gap: 1.2 }} ref={provided.innerRef} {...provided.droppableProps}>
                        {dogsByTimeState[time]?.map((dog, idx) => {
                          const dogIdx = sortedTimesState.slice(0, droppableIdx).reduce((acc, t) => acc + (dogsByTimeState[t]?.length || 0), 0) + idx;
                          return (
                            <Draggable key={dog.id} draggableId={String(dog.id)} index={idx}>
                              {(provided) => (
                                <Paper
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => setSelectedDog(dog)}
                                  sx={{
                                    p: 1.2,
                                    minWidth: 200,
                                    maxWidth: 220,
                                    minHeight: 90,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    boxShadow: 2,
                                    cursor: 'pointer',
                                    mb: 0.5,
                                    border:
                                      routeMode === 'single' && selectedStopIdx === dogIdx
                                        ? '2px solid #1976d2'
                                        : undefined,
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">{dog.name}</Typography>
                                    {escapeArtistNames.includes(dog.name) && (
                                      <Tooltip title="Escape artist">
                                        <WarningIcon color="warning" fontSize="small" />
                                      </Tooltip>
                                    )}
                                  </Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getStreetName(dog.address)}</Typography>
                                  <Typography variant="caption" color={idx % 2 === 0 ? 'primary' : 'secondary'} sx={{ mt: 0.5 }}>
                                    {idx % 2 === 0 ? 'Individual Walk' : 'Group Walk'}
                                  </Typography>
                                  {/* Show expected arrival time for this dog */}
                                  {expectedArrivalTimes[dogIdx] && (
                                    <Typography variant="caption" color="success.main" sx={{ mt: 0.5 }}>
                                      ETA: {expectedArrivalTimes[dogIdx]}
                                    </Typography>
                                  )}
                                  {/* Show walk time for this dog */}
                                  <Typography variant="caption" color="info.main" sx={{ mt: 0.5 }}>
                                    Walk: {walkTimes[dogIdx]} min
                                  </Typography>
                                </Paper>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </Paper>
              </div>
            ))}
          </DragDropContext>
        </Grid>
        {/* Right: Map */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom>
            Route Map
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Button
              variant={routeMode === 'full' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setRouteMode('full')}
            >
              Full Route
            </Button>
            <Button
              variant={routeMode === 'single' ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setRouteMode('single')}
            >
              Single Route
            </Button>
          </Box>
          <Paper sx={{ p: 2, height: '100%' }}>
            <div ref={mapContainer} style={{ width: '100%', height: 500 }} />
          </Paper>
        </Grid>
      </Grid>
      {/* Dog Profile Modal */}
      <Modal
        open={!!selectedDog}
        onClose={() => setSelectedDog(null)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={!!selectedDog}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, maxWidth: '98vw', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
            {selectedDog && (
              <Grid container spacing={3}>
                {/* Left: Photo & Basic Info */}
                <Grid item xs={12} sm={5}>
                  <Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: '#f7fafc' }}>
                    {selectedDog.photoUrl ? (
                      <Avatar src={selectedDog.photoUrl} sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }} />
                    ) : (
                      <Box sx={{ width: 100, height: 100, mx: 'auto', mb: 1, bgcolor: '#e0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, color: '#bdbdbd' }}>
                        <span role="img" aria-label="paw">🐾</span>
                      </Box>
                    )}
                    <Typography variant="h6" fontWeight="bold">{selectedDog.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedDog.breed} • {selectedDog.age} years</Typography>
                    <FormControl fullWidth size="small" sx={{ mt: 1, mb: 1 }}>
                      <InputLabel id="walk-type-label">Walk Type</InputLabel>
                      <Select
                        labelId="walk-type-label"
                        value={selectedDog.walkType}
                        label="Walk Type"
                        onChange={e => handleWalkTypeChange(selectedDog.id, e.target.value as 'individual' | 'group')}
                      >
                        <MenuItem value="group">Group walks available</MenuItem>
                        <MenuItem value="individual">Individual Only (cannot be grouped)</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" sx={{ mt: 1, mb: 1 }}>
                      <InputLabel id="temperament-label">Temperament</InputLabel>
                      <Select
                        labelId="temperament-label"
                        value={tempTemperament}
                        label="Temperament"
                        onChange={e => handleTemperamentChange(selectedDog.id, e.target.value as string)}
                      >
                        <MenuItem value="Aggressive">Aggressive</MenuItem>
                        <MenuItem value="Energetic">Energetic</MenuItem>
                        <MenuItem value="Timid">Timid</MenuItem>
                        <MenuItem value="Normal">Normal</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small" sx={{ mt: 1, mb: 1 }}>
                      <InputLabel id="walktime-label">Walk Time</InputLabel>
                      <Select
                        labelId="walktime-label"
                        value={tempWalkTime}
                        label="Walk Time"
                        onChange={e => handleWalkTimeChange(selectedDog.id, e.target.value as '30min' | '60min')}
                      >
                        <MenuItem value="30min">30 min</MenuItem>
                        <MenuItem value="60min">60 min</MenuItem>
                      </Select>
                    </FormControl>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="text.secondary"><b>Owner:</b> {selectedDog.owner}</Typography>
                    <Typography variant="body2" color="text.secondary"><b>Cell:</b> {selectedDog.ownerCell}</Typography>
                    <Typography variant="body2" color="text.secondary"><b>Email:</b> {selectedDog.ownerEmail}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="text.secondary"><b>Full Address:</b> {selectedDog.address}</Typography>
                  </Paper>
                </Grid>
                {/* Right: Gamification & Analytics */}
                <Grid item xs={12} sm={7}>
                  <Paper sx={{ p: 2, mb: 2, bgcolor: '#fffde7' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>Experience</Typography>
                      <Box sx={{ bgcolor: '#ffb300', color: 'white', px: 2, py: 0.5, borderRadius: 2, fontWeight: 'bold', fontSize: 18 }}>L{selectedDog.level}</Box>
                    </Box>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Box sx={{ height: 8, bgcolor: '#ffe082', borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{ width: `${(selectedDog.xp / selectedDog.xpToNext) * 100}%`, height: '100%', bgcolor: '#ffb300' }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {selectedDog.xpToNext - selectedDog.xp} more walks until level {selectedDog.level + 1}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Typography variant="body2">Loyalty: {'★'.repeat(selectedDog.loyalty)}{'☆'.repeat(5 - selectedDog.loyalty)}</Typography>
                      <Typography variant="body2">Walking Streak: {selectedDog.streak} days</Typography>
                    </Box>
                  </Paper>
                  <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Walk Analytics</Typography>
                    <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Total Walks</Typography>
                        <Typography variant="h5" color="primary">{dogWalkCounts[selectedDog.id] || 0}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">This Month</Typography>
                        <Typography variant="h5" color="secondary">{Math.max(1, Math.floor((dogWalkCounts[selectedDog.id] || 0) / 3))}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Per Walk</Typography>
                        <Typography variant="h5" color="success.main">${selectedDog.perWalkRevenue}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
                        <Typography variant="h5" color="success.main">${selectedDog.totalRevenue}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Paper sx={{ p: 2, mb: 2, bgcolor: '#e3f2fd' }}>
                    <Typography variant="h6" fontWeight="bold">Behavior Summary</Typography>
                    <Typography variant="body2" color="text.secondary">No walk data available yet.</Typography>
                  </Paper>
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" fontWeight="bold">Notes</Typography>
                    <Box component="form" onSubmit={e => e.preventDefault()}>
                      <textarea
                        value={notesDraft}
                        onChange={e => handleNotesChange(selectedDog.id, e.target.value)}
                        rows={4}
                        style={{ width: '100%', fontSize: '1rem', borderRadius: 6, border: '1px solid #ccc', padding: 8, resize: 'vertical' }}
                        placeholder={"• Add a note\n• Use bullets for short points"}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Modal>
      {/* Add Snackbar for error messages */}
      <Snackbar open={!!errorMsg} autoHideDuration={4000} onClose={() => setErrorMsg(null)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setErrorMsg(null)} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;