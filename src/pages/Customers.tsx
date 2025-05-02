import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Pets as PetsIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const mockCustomers = [
  {
    id: 1,
    name: 'John Smith',
    pets: [
      { name: 'Luna', breed: 'Golden Retriever', age: 3 },
    ],
    address: '1234 Park Ave NW, Washington, DC',
    schedule: 'Mon, Wed, Fri',
    notes: 'Luna needs extra exercise',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    pets: [
      { name: 'Max', breed: 'German Shepherd', age: 2 },
      { name: 'Bella', breed: 'Poodle', age: 4 },
    ],
    address: '5678 Wisconsin Ave NW, Washington, DC',
    schedule: 'Tue, Thu',
    notes: 'Max and Bella should be walked separately',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    pets: [
      { name: 'Rocky', breed: 'Labrador', age: 1 },
    ],
    address: '910 Connecticut Ave NW, Washington, DC',
    schedule: 'Mon, Thu',
    notes: 'Rocky is still in training',
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.pets.some(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

      <Grid container spacing={3}>
        {filteredCustomers.map((customer) => (
          <Grid item xs={12} md={6} key={customer.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {customer.name}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {customer.pets.map((pet) => (
                    <Chip
                      key={pet.name}
                      icon={<PetsIcon />}
                      label={`${pet.name} (${pet.breed})`}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {customer.address}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ScheduleIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Schedule: {customer.schedule}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Notes: {customer.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 