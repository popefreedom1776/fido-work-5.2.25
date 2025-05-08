import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Collapse,
  Chip,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { ExpandMore, ExpandLess, Pets as PetsIcon } from '@mui/icons-material';
import { Dog, DogOwner } from '../types/dog';

// Example data for demonstration
const exampleOwners: DogOwner[] = [
  {
    id: '1',
    name: 'John Smith',
    dogs: [
      {
        id: 'd1',
        ownerId: '1',
        name: 'Luna',
        dateOfBirth: '2018-05-10',
        age: 5,
        gender: 'female',
        coatColor: 'Golden',
        spayedNeutered: true,
        biteHistory: 'NA',
        biteHistoryInfo: '',
        foodAllergies: '',
        feedingInstructions: '',
        canHaveTreats: true,
        medication: '',
        pictureUrl: '',
      },
    ],
    contactInfo: {
      phone: '555-1234',
      email: 'john@example.com',
      address: '1234 Park Ave NW, Washington, DC',
    },
    walkingEquipment: {
      leash: 'Standard leash',
      harness: 'No-pull harness',
      collar: 'Blue collar',
      other: '',
    },
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    dogs: [
      {
        id: 'd2',
        ownerId: '2',
        name: 'Max',
        dateOfBirth: '2017-03-15',
        age: 6,
        gender: 'male',
        coatColor: 'Black and Tan',
        spayedNeutered: false,
        biteHistory: 'Dogs',
        biteHistoryInfo: 'Max can be reactive to other dogs',
        foodAllergies: 'Chicken',
        feedingInstructions: 'Feed twice daily',
        canHaveTreats: false,
        medication: 'Joint supplement',
        pictureUrl: '',
      },
      {
        id: 'd3',
        ownerId: '2',
        name: 'Bella',
        dateOfBirth: '2020-11-01',
        age: 3,
        gender: 'female',
        coatColor: 'White',
        spayedNeutered: true,
        biteHistory: 'NA',
        biteHistoryInfo: '',
        foodAllergies: '',
        feedingInstructions: '',
        canHaveTreats: true,
        medication: '',
        pictureUrl: '',
      },
    ],
    contactInfo: {
      phone: '555-5678',
      email: 'sarah@example.com',
      address: '5678 Wisconsin Ave NW, Washington, DC',
    },
    walkingEquipment: {
      leash: 'Retractable leash',
      harness: '',
      collar: 'Pink collar',
      other: '',
    },
  },
];

const DogDirectory: React.FC = () => {
  // Replace exampleOwners with your real data source
  const [owners] = useState<DogOwner[]>(exampleOwners);
  const [expandedOwner, setExpandedOwner] = useState<string | null>(null);

  const handleOwnerClick = (ownerId: string) => {
    setExpandedOwner(expandedOwner === ownerId ? null : ownerId);
  };

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Dog Directory
      </Typography>
      {owners.map((owner) => (
        <Paper key={owner.id} sx={{ mb: 2, p: 2, cursor: 'pointer', width: '100%' }} elevation={3}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            onClick={() => handleOwnerClick(owner.id)}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{owner.name}</Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {owner.dogs.map((dog) => (
                  <Chip
                    key={dog.id}
                    icon={<PetsIcon color="primary" />}
                    label={dog.name}
                    color="default"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
            <IconButton>
              {expandedOwner === owner.id ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <Collapse in={expandedOwner === owner.id} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 2 }} />
            {owner.dogs.map((dog) => (
              <Box key={dog.id} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  {dog.name} ({dog.gender === 'male' ? 'Male' : 'Female'})
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Avatar src={dog.pictureUrl} sx={{ width: 80, height: 80, mb: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="body2"><b>Date of Birth:</b> {dog.dateOfBirth}</Typography>
                    <Typography variant="body2"><b>Age:</b> {calculateAge(dog.dateOfBirth)} years</Typography>
                    <Typography variant="body2"><b>Coat Color:</b> {dog.coatColor}</Typography>
                    <Typography variant="body2"><b>Spayed/Neutered:</b> {dog.spayedNeutered ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body2"><b>Bite History:</b> {dog.biteHistory}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {dog.biteHistoryInfo || 'No additional info'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Feeding Information</Typography>
                    <Typography variant="body2"><b>Food Allergies:</b> {dog.foodAllergies || 'None'}</Typography>
                    <Typography variant="body2"><b>Feeding Instructions:</b> {dog.feedingInstructions || 'N/A'}</Typography>
                    <Typography variant="body2"><b>Can Have Treats:</b> {dog.canHaveTreats ? 'Yes' : 'No'}</Typography>
                    <Typography variant="body2"><b>Medication:</b> {dog.medication || 'None'}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">Contact</Typography>
            <Typography variant="body2"><b>Phone:</b> {owner.contactInfo.phone}</Typography>
            <Typography variant="body2"><b>Email:</b> {owner.contactInfo.email}</Typography>
            <Typography variant="body2"><b>Address:</b> {owner.contactInfo.address}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">Walking Equipment</Typography>
            <Typography variant="body2"><b>Leash:</b> {owner.walkingEquipment.leash || 'N/A'}</Typography>
            <Typography variant="body2"><b>Harness:</b> {owner.walkingEquipment.harness || 'N/A'}</Typography>
            <Typography variant="body2"><b>Collar:</b> {owner.walkingEquipment.collar || 'N/A'}</Typography>
            <Typography variant="body2"><b>Other:</b> {owner.walkingEquipment.other || 'N/A'}</Typography>
          </Collapse>
        </Paper>
      ))}
    </Box>
  );
};

export default DogDirectory; 