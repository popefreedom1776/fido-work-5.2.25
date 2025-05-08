import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Button,
  Modal,
  Fade,
  Backdrop,
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Pets as PetsIcon,
  ExpandMore,
  ExpandLess,
  Warning as WarningIcon,
} from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinearProgress from '@mui/material/LinearProgress';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'John Smith',
    pets: [
      {
        name: 'Luna',
        breed: 'Golden Retriever',
        age: 3,
        gender: 'Female',
        coatColor: 'Golden',
        spayedNeutered: true,
        biteHistory: 'NA',
        biteHistoryInfo: '',
        foodAllergies: '',
        feedingInstructions: '',
        canHaveTreats: true,
        medication: '',
        pictureUrl: '',
        notes: 'Needs extra exercise',
        dateOfBirth: '01/15/20',
        crate: 'yes',
        enrichmentActivity: '',
        refillWaterBowl: 'yes',
        refillFood: 'no',
        flightRisk: 'yes',
      },
    ],
    address: '1234 Park Ave NW, Washington, DC',
    schedule: ['Mon', 'Wed', 'Fri'],
    notes: 'Luna needs extra exercise',
    phone: '555-1234',
    email: 'john@example.com',
    equipmentOwnership: 'Owner',
    equipmentUsed: 'Standard leash, no-pull harness',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    pets: [
      {
        name: 'Max',
        breed: 'German Shepherd',
        age: 2,
        gender: 'Male',
        coatColor: 'Black and Tan',
        spayedNeutered: false,
        biteHistory: 'Dogs',
        biteHistoryInfo: 'Reactive to other dogs',
        foodAllergies: 'Chicken',
        feedingInstructions: 'Feed twice daily',
        canHaveTreats: false,
        medication: 'Joint supplement',
        pictureUrl: '',
        notes: 'Reactive to other dogs',
        dateOfBirth: '05/02/19',
        crate: 'no',
        enrichmentActivity: 'Fetch',
        refillWaterBowl: 'yes',
        refillFood: 'yes',
      },
      {
        name: 'Bella',
        breed: 'Poodle',
        age: 4,
        gender: 'Female',
        coatColor: 'White',
        spayedNeutered: true,
        biteHistory: 'NA',
        biteHistoryInfo: '',
        foodAllergies: '',
        feedingInstructions: '',
        canHaveTreats: true,
        medication: '',
        pictureUrl: '',
        notes: '',
        dateOfBirth: '07/10/17',
        crate: 'yes',
        enrichmentActivity: 'Tug',
        refillWaterBowl: 'yes',
        refillFood: 'yes',
      },
    ],
    address: '5678 Wisconsin Ave NW, Washington, DC',
    schedule: ['Tue', 'Thu'],
    notes: 'Max and Bella should be walked separately',
    phone: '555-5678',
    email: 'sarah@example.com',
    equipmentOwnership: 'Owner',
    equipmentUsed: 'Retractable leash, Pink collar',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    pets: [
      {
        name: 'Rocky',
        breed: 'Labrador',
        age: 1,
        gender: 'Male',
        coatColor: 'Black',
        spayedNeutered: true,
        biteHistory: 'NA',
        biteHistoryInfo: '',
        foodAllergies: '',
        feedingInstructions: '',
        canHaveTreats: true,
        medication: '',
        pictureUrl: '',
        notes: 'Still in training',
        dateOfBirth: '09/30/20',
        crate: 'no',
        enrichmentActivity: 'Chew toys',
        refillWaterBowl: 'yes',
        refillFood: 'yes',
      },
    ],
    address: '910 Connecticut Ave NW, Washington, DC',
    schedule: ['Mon', 'Thu'],
    notes: 'Rocky is still in training',
    phone: '555-9012',
    email: 'mike@example.com',
    equipmentOwnership: 'Owner',
    equipmentUsed: 'N/A',
  },
];

type Pet = {
  name: string;
  breed: string;
  age: number;
  gender: string;
  coatColor: string;
  spayedNeutered: boolean;
  biteHistory: string;
  biteHistoryInfo: string;
  foodAllergies: string;
  feedingInstructions: string;
  canHaveTreats: boolean;
  medication: string;
  pictureUrl: string;
  notes: string;
  dateOfBirth?: string;
  crate?: string;
  enrichmentActivity?: string;
  refillWaterBowl?: string;
  refillFood?: string;
  flightRisk?: string;
  packRole?: string;
  disposition?: string;
  knownCommands?: string;
  carSickness?: string;
  reactive?: string;
  reactivityTriggers?: string;
  cost30?: string;
  cost60?: string;
  level?: number;
  streak?: number;
  walks?: number;
  poops?: number;
  revenue?: number;
  // Home Instructions
  privateVisitNotes?: string;
  preArrivalMessage?: string;
  entryLocation?: string;
  shoesOnOff?: string;
  childrenUnder5?: string;
  mailPlacement?: string;
  packagePlacement?: string;
  dogTowelLocation?: string;
  foodWaterBowlsLocation?: string;
  trashCanLocation?: string;
  restroomLocation?: string;
  cleaningSuppliesLocation?: string;
  clientEquipmentLocation?: string;
};

type Customer = {
  id: number;
  name: string;
  pets: Pet[];
  address: string;
  schedule: string[]; // days of week
  notes: string;
  phone: string;
  email: string;
  equipmentOwnership: string;
  equipmentUsed: string;
};

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [dogView, setDogView] = useState<'info' | 'scoreboard' | 'home'>('info');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.pets.some(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Helper to calculate age from MM/DD/YY
  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const [mm, dd, yy] = dob.split('/');
    const year = parseInt(yy.length === 2 ? '20' + yy : yy, 10);
    const birthDate = new Date(year, parseInt(mm, 10) - 1, parseInt(dd, 10));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // When opening modal, copy customer to editCustomer
  const handleOpenModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditCustomer(JSON.parse(JSON.stringify(customer)));
  };

  // Handle field changes
  const handleFieldChange = (field: keyof Customer, value: any) => {
    if (!editCustomer) return;
    setEditCustomer({ ...editCustomer, [field]: value });
  };
  const handlePetFieldChange = (petIdx: number, field: keyof Pet, value: any) => {
    if (!editCustomer) return;
    const pets = [...editCustomer.pets];
    pets[petIdx] = { ...pets[petIdx], [field]: value };
    setEditCustomer({ ...editCustomer, pets });
  };

  const handleSave = () => {
    if (!editCustomer) return;
    setCustomers(prev => prev.map(c => c.id === editCustomer.id ? editCustomer : c));
    setSelectedCustomer(null);
    setEditCustomer(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Customers</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Customer
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search customers or pets..."
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box>
        {filteredCustomers.map((customer) => (
          <Paper key={customer.id} sx={{ mb: 2, p: 2, cursor: 'pointer', width: '100%' }} elevation={3} onClick={() => handleOpenModal(customer)}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{customer.name}</Typography>
                  {customer.pets.some(pet => pet.flightRisk === 'yes') && (
                    <Tooltip title="Contains escape artist dog(s)">
                      <WarningIcon color="warning" />
                    </Tooltip>
                  )}
                </Box>
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {customer.pets.map((pet) => (
                    <Chip
                      key={pet.name}
                      icon={<PetsIcon color="primary" />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {pet.name} ({pet.breed})
                          {pet.flightRisk === 'yes' && (
                            <Tooltip title="Escape artist">
                              <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                            </Tooltip>
                          )}
                        </Box>
                      }
                      color="default"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
              <IconButton>
                <ExpandMore />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Modal for customer profile */}
      <Modal
        open={!!selectedCustomer}
        onClose={() => { setSelectedCustomer(null); setEditCustomer(null); }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={!!selectedCustomer}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, maxWidth: '98vw', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, maxHeight: '90vh', overflowY: 'auto' }}>
            {editCustomer && (
              <>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={editCustomer.name}
                  onChange={e => handleFieldChange('name', e.target.value)}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <Divider sx={{ mb: 2 }} />
                {/* Contact Info */}
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Contact</Typography>
                <TextField
                  fullWidth
                  label="Phone"
                  value={editCustomer.phone}
                  onChange={e => handleFieldChange('phone', e.target.value)}
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={editCustomer.email}
                  onChange={e => handleFieldChange('email', e.target.value)}
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Address"
                  value={editCustomer.address}
                  onChange={e => handleFieldChange('address', e.target.value)}
                  margin="dense"
                  size="small"
                />
                <Divider sx={{ my: 2 }} />
                {/* Walking Equipment (simple) */}
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Walking Equipment</Typography>
                <TextField
                  fullWidth
                  label="Equipment Ownership"
                  value={editCustomer.equipmentOwnership}
                  onChange={e => handleFieldChange('equipmentOwnership', e.target.value)}
                  margin="dense"
                  size="small"
                />
                <TextField
                  fullWidth
                  label="Equipment Used"
                  value={editCustomer.equipmentUsed}
                  onChange={e => handleFieldChange('equipmentUsed', e.target.value)}
                  margin="dense"
                  size="small"
                />
                <Divider sx={{ my: 2 }} />
                {/* Schedule (days of week) */}
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Schedule</Typography>
                <ToggleButtonGroup
                  value={editCustomer.schedule}
                  onChange={(_, value) => handleFieldChange('schedule', value)}
                  aria-label="days of week"
                  size="small"
                  sx={{ mb: 2 }}
                >
                  {daysOfWeek.map(day => (
                    <ToggleButton key={day} value={day} aria-label={day}>
                      {day}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <TextField
                  fullWidth
                  label="Notes"
                  value={editCustomer.notes}
                  onChange={e => handleFieldChange('notes', e.target.value)}
                  margin="dense"
                  size="small"
                  multiline
                  rows={2}
                />
                {/* Gamification/Analytics Toggle */}
                <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                  <Button
                    variant={dogView === 'info' ? 'contained' : 'outlined'}
                    onClick={() => setDogView('info')}
                  >
                    General Dog Information
                  </Button>
                  <Button
                    variant={dogView === 'home' ? 'contained' : 'outlined'}
                    onClick={() => setDogView('home')}
                  >
                    Home Instructions
                  </Button>
                  <Button
                    variant={dogView === 'scoreboard' ? 'contained' : 'outlined'}
                    onClick={() => setDogView('scoreboard')}
                  >
                    Dog Scoreboard
                  </Button>
                </Box>
                {/* Dog(s) Info, Home Instructions, or Scoreboard */}
                {dogView === 'info' ? (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Dog(s)</Typography>
                    {editCustomer.pets.map((pet, idx) => (
                      <Paper key={pet.name} sx={{ mb: 3, p: 2, bgcolor: '#f7fafc' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={3}>
                            <Avatar src={pet.pictureUrl} sx={{ width: 80, height: 80, mb: 1 }} />
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            {/* Basic Info Section */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Basic Info</Typography>
                            <TextField
                              fullWidth
                              label="Name"
                              value={pet.name}
                              onChange={e => handlePetFieldChange(idx, 'name', e.target.value)}
                              margin="normal"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              label="Breed"
                              value={pet.breed}
                              onChange={e => handlePetFieldChange(idx, 'breed', e.target.value)}
                              margin="normal"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              label="Date of Birth (MM/DD/YY)"
                              value={pet.dateOfBirth || ''}
                              onChange={e => handlePetFieldChange(idx, 'dateOfBirth', e.target.value)}
                              margin="normal"
                              size="small"
                              placeholder="MM/DD/YY"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Age: {pet.dateOfBirth ? calculateAge(pet.dateOfBirth) : ''} years
                            </Typography>
                            <FormControl fullWidth margin="normal" size="small">
                              <InputLabel>Gender</InputLabel>
                              <Select value={pet.gender} label="Gender" onChange={e => handlePetFieldChange(idx, 'gender', e.target.value)}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Coat Color"
                              value={pet.coatColor || ''}
                              onChange={e => handlePetFieldChange(idx, 'coatColor', e.target.value)}
                              margin="normal"
                              size="small"
                            />
                            <FormControl fullWidth margin="normal" size="small">
                              <InputLabel>Spayed/Neutered</InputLabel>
                              <Select value={pet.spayedNeutered ? 'yes' : 'no'} label="Spayed/Neutered" onChange={e => handlePetFieldChange(idx, 'spayedNeutered', e.target.value === 'yes')}>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Medication"
                              value={pet.medication || ''}
                              onChange={e => handlePetFieldChange(idx, 'medication', e.target.value)}
                              margin="normal"
                              size="small"
                            />
                            <FormControl fullWidth margin="normal" size="small">
                              <InputLabel>Can Have Treats?</InputLabel>
                              <Select value={pet.canHaveTreats ? 'yes' : 'no'} label="Can Have Treats?" onChange={e => handlePetFieldChange(idx, 'canHaveTreats', e.target.value === 'yes')}>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Food Allergies"
                              value={pet.foodAllergies || ''}
                              onChange={e => handlePetFieldChange(idx, 'foodAllergies', e.target.value)}
                              margin="normal"
                              size="small"
                            />
                            <TextField
                              fullWidth
                              label="Feeding Instructions"
                              value={pet.feedingInstructions || ''}
                              onChange={e => handlePetFieldChange(idx, 'feedingInstructions', e.target.value)}
                              margin="normal"
                              size="small"
                              multiline
                              rows={2}
                            />
                            {/* Cost per walk */}
                            <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                              <TextField
                                label="30 min ($)"
                                value={pet.cost30 || ''}
                                onChange={e => handlePetFieldChange(idx, 'cost30', e.target.value)}
                                size="small"
                                sx={{ width: 120 }}
                              />
                              <TextField
                                label="60 min ($)"
                                value={pet.cost60 || ''}
                                onChange={e => handlePetFieldChange(idx, 'cost60', e.target.value)}
                                size="small"
                                sx={{ width: 120 }}
                              />
                            </Box>
                            {/* Bite History Section */}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Bite History</Typography>
                            <FormControl fullWidth margin="normal" size="small">
                              <InputLabel>Bite History</InputLabel>
                              <Select value={pet.biteHistory} label="Bite History" onChange={e => handlePetFieldChange(idx, 'biteHistory', e.target.value)}>
                                <MenuItem value="NA">NA</MenuItem>
                                <MenuItem value="Humans">Humans</MenuItem>
                                <MenuItem value="Dogs">Dogs</MenuItem>
                                <MenuItem value="Both">Both</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Bite History Information"
                              value={pet.biteHistoryInfo || ''}
                              onChange={e => handlePetFieldChange(idx, 'biteHistoryInfo', e.target.value)}
                              margin="normal"
                              size="small"
                              placeholder="Dogs, Humans, or both"
                              InputProps={{
                                style: { color: pet.biteHistoryInfo ? undefined : '#bdbdbd' },
                              }}
                            />
                            {/* Temperament Section */}
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Temperament</Typography>
                            <FormControl fullWidth margin="dense" size="small">
                              <InputLabel>Flight Risk ("Escape Artist")</InputLabel>
                              <Select
                                value={pet.flightRisk || 'no'}
                                label="Flight Risk (Escape Artist)"
                                onChange={e => handlePetFieldChange(idx, 'flightRisk', e.target.value)}
                              >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth margin="dense" size="small">
                              <InputLabel>Alpha/Beta/Omega</InputLabel>
                              <Select
                                value={pet.packRole || ''}
                                label="Alpha/Beta/Omega"
                                onChange={e => handlePetFieldChange(idx, 'packRole', e.target.value)}
                              >
                                <MenuItem value="Alpha">Alpha</MenuItem>
                                <MenuItem value="Beta">Beta</MenuItem>
                                <MenuItem value="Omega">Omega</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth margin="dense" size="small">
                              <InputLabel>Disposition</InputLabel>
                              <Select
                                value={pet.disposition || ''}
                                label="Disposition"
                                onChange={e => handlePetFieldChange(idx, 'disposition', e.target.value)}
                              >
                                <MenuItem value="energetic">Energetic</MenuItem>
                                <MenuItem value="shy">Shy</MenuItem>
                                <MenuItem value="aggressive">Aggressive</MenuItem>
                                <MenuItem value="calm">Calm</MenuItem>
                                <MenuItem value="protective">Protective</MenuItem>
                                <MenuItem value="anxious">Anxious</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Known Commands"
                              value={pet.knownCommands || ''}
                              onChange={e => handlePetFieldChange(idx, 'knownCommands', e.target.value)}
                              margin="dense"
                              size="small"
                            />
                            <FormControl fullWidth margin="dense" size="small">
                              <InputLabel>Car Sickness</InputLabel>
                              <Select
                                value={pet.carSickness || 'no'}
                                label="Car Sickness"
                                onChange={e => handlePetFieldChange(idx, 'carSickness', e.target.value)}
                              >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth margin="dense" size="small">
                              <InputLabel>Reactive</InputLabel>
                              <Select
                                value={pet.reactive || 'no'}
                                label="Reactive"
                                onChange={e => handlePetFieldChange(idx, 'reactive', e.target.value)}
                              >
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Reactivity Triggers"
                              value={pet.reactivityTriggers || ''}
                              onChange={e => handlePetFieldChange(idx, 'reactivityTriggers', e.target.value)}
                              margin="dense"
                              size="small"
                              placeholder="Other dogwalkers, bicycles, mailmen."
                              InputProps={{
                                style: { color: pet.reactivityTriggers ? undefined : '#bdbdbd' },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </>
                ) : dogView === 'home' ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2, bgcolor: '#f7fafc', borderRadius: 2 }}>
                    {editCustomer.pets.map((pet, idx) => (
                      <Paper key={pet.name} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>{pet.name}'s Home Instructions</Typography>
                        
                        {/* Pick-up Instructions */}
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Pick-up Instructions</Typography>
                          <TextField
                            fullWidth
                            label="Private Visit Notes"
                            value={pet.privateVisitNotes || ''}
                            onChange={e => handlePetFieldChange(idx, 'privateVisitNotes', e.target.value)}
                            multiline
                            rows={3}
                            sx={{ mb: 2 }}
                          />
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Send Pre-Arrival Message</InputLabel>
                            <Select
                              value={pet.preArrivalMessage || ''}
                              label="Send Pre-Arrival Message"
                              onChange={e => handlePetFieldChange(idx, 'preArrivalMessage', e.target.value)}
                            >
                              <MenuItem value="yes">Yes</MenuItem>
                              <MenuItem value="no">No</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Entry Location"
                            value={pet.entryLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'entryLocation', e.target.value)}
                            placeholder="side door, mud room, etc."
                            sx={{ mb: 2 }}
                          />
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Shoes On/Off</InputLabel>
                            <Select
                              value={pet.shoesOnOff || ''}
                              label="Shoes On/Off"
                              onChange={e => handlePetFieldChange(idx, 'shoesOnOff', e.target.value)}
                            >
                              <MenuItem value="on">On</MenuItem>
                              <MenuItem value="off">Off</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Children Under 5 Years</InputLabel>
                            <Select
                              value={pet.childrenUnder5 || ''}
                              label="Children Under 5 Years"
                              onChange={e => handlePetFieldChange(idx, 'childrenUnder5', e.target.value)}
                            >
                              <MenuItem value="yes">Yes</MenuItem>
                              <MenuItem value="no">No</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Mail Placement"
                            value={pet.mailPlacement || ''}
                            onChange={e => handlePetFieldChange(idx, 'mailPlacement', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Package Placement"
                            value={pet.packagePlacement || ''}
                            onChange={e => handlePetFieldChange(idx, 'packagePlacement', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                        </Box>

                        {/* Drop-off Instructions */}
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Drop-off Instructions</Typography>
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Crate</InputLabel>
                            <Select
                              value={pet.crate || 'no'}
                              label="Crate"
                              onChange={e => handlePetFieldChange(idx, 'crate', e.target.value)}
                            >
                              <MenuItem value="yes">Yes</MenuItem>
                              <MenuItem value="no">No</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Enrichment Activity"
                            value={pet.enrichmentActivity || ''}
                            onChange={e => handlePetFieldChange(idx, 'enrichmentActivity', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Refill Water Bowl</InputLabel>
                            <Select
                              value={pet.refillWaterBowl || 'no'}
                              label="Refill Water Bowl"
                              onChange={e => handlePetFieldChange(idx, 'refillWaterBowl', e.target.value)}
                            >
                              <MenuItem value="yes">Yes</MenuItem>
                              <MenuItem value="no">No</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Refill Food</InputLabel>
                            <Select
                              value={pet.refillFood || 'no'}
                              label="Refill Food"
                              onChange={e => handlePetFieldChange(idx, 'refillFood', e.target.value)}
                            >
                              <MenuItem value="yes">Yes</MenuItem>
                              <MenuItem value="no">No</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        {/* Item Locations */}
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Item Locations</Typography>
                          <TextField
                            fullWidth
                            label="Dog Towel"
                            value={pet.dogTowelLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'dogTowelLocation', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Food/Water Bowls"
                            value={pet.foodWaterBowlsLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'foodWaterBowlsLocation', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Trash Can"
                            value={pet.trashCanLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'trashCanLocation', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Restroom"
                            value={pet.restroomLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'restroomLocation', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Cleaning Supplies"
                            value={pet.cleaningSuppliesLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'cleaningSuppliesLocation', e.target.value)}
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            fullWidth
                            label="Client-owned Equipment"
                            value={pet.clientEquipmentLocation || ''}
                            onChange={e => handlePetFieldChange(idx, 'clientEquipmentLocation', e.target.value)}
                            placeholder="Shelf, drawer, etc."
                            sx={{ mb: 2 }}
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                ) : (
                  // Dog Scoreboard view (one per dog)
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2, bgcolor: '#f7fafc', borderRadius: 2 }}>
                    {editCustomer.pets.map((pet, idx) => (
                      <Box key={pet.name} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {/* Experience Card */}
                        <Box sx={{ bgcolor: '#fffbe6', border: '1.5px solid #ffe082', borderRadius: 3, p: 2, minWidth: 220, flex: 1, boxShadow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <StarIcon sx={{ color: '#ffb300', mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Experience - {pet.name}</Typography>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffb300' }}>Level {pet.level || 1}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2">{pet.xp || 5} XP</Typography>
                            <Box sx={{ flex: 1, ml: 1 }}>
                              <LinearProgress variant="determinate" value={pet.xp ? Math.min((pet.xp % 10) * 10, 100) : 25} sx={{ height: 8, borderRadius: 4, bgcolor: '#fffde7', '& .MuiLinearProgress-bar': { bgcolor: '#ffb300' } }} />
                            </Box>
                          </Box>
                          <Typography variant="caption" color="text.secondary">{pet.xpToNext ? `${pet.xpToNext - (pet.xp || 0)} more walks until level ${(pet.level || 1) + 1}` : '5 more walks until level 2'}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Loyalty</Typography>
                              <Box>
                                {[1,2,3,4,5].map(i => <StarBorderIcon key={i} sx={{ fontSize: 18, color: '#ffe082' }} />)}
                              </Box>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Walking Streak</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#ffb300' }}>{pet.streak || 1} days</Typography>
                            </Box>
                          </Box>
                        </Box>
                        {/* Walk Analytics Card */}
                        <Box sx={{ bgcolor: '#f5f7ff', border: '1.5px solid #90caf9', borderRadius: 3, p: 2, minWidth: 220, flex: 1, boxShadow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <BarChartIcon sx={{ color: '#1976d2', mr: 1 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Walk Analytics</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Total Walks</Typography>
                              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 700 }}>{pet.walks || 5}</Typography>
                              <LinearProgress variant="determinate" value={pet.walks ? Math.min(pet.walks * 10, 100) : 50} sx={{ height: 5, borderRadius: 2, bgcolor: '#e3f2fd', '& .MuiLinearProgress-bar': { bgcolor: '#1976d2' } }} />
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">This Month</Typography>
                              <Typography variant="h6" sx={{ color: '#43a047', fontWeight: 700 }}>{pet.walksThisMonth || 1}</Typography>
                              <LinearProgress variant="determinate" value={pet.walksThisMonth ? Math.min(pet.walksThisMonth * 20, 100) : 20} sx={{ height: 5, borderRadius: 2, bgcolor: '#e8f5e9', '& .MuiLinearProgress-bar': { bgcolor: '#43a047' } }} />
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Per Walk</Typography>
                              <Typography variant="h6" sx={{ color: '#7c4dff', fontWeight: 700 }}>${pet.cost30 || 20}</Typography>
                              <LinearProgress variant="determinate" value={100} sx={{ height: 5, borderRadius: 2, bgcolor: '#ede7f6', '& .MuiLinearProgress-bar': { bgcolor: '#7c4dff' } }} />
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
                              <Typography variant="h6" sx={{ color: '#7c4dff', fontWeight: 700 }}>${pet.revenue || 100}</Typography>
                              <LinearProgress variant="determinate" value={pet.revenue ? Math.min(pet.revenue, 100) : 50} sx={{ height: 5, borderRadius: 2, bgcolor: '#ede7f6', '& .MuiLinearProgress-bar': { bgcolor: '#7c4dff' } }} />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
                {/* Save Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
} 