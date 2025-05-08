import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Tooltip,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Add as AddIcon, Warning as WarningIcon } from '@mui/icons-material';

interface DogProfile {
  name: string;
  address: string;
  walkType: 'individual' | 'group';
}

interface Walk {
  time: string;
  duration: string;
  dogs: DogProfile[];
}

interface Schedule {
  [key: string]: Walk[];
}

const mockSchedule: Schedule = {
  '2024-04-16': [
    {
      time: '9:00 AM',
      duration: '30 min',
      dogs: [
        { name: 'Luna', address: '1234 Park Ave NW', walkType: 'individual' },
        { name: 'Max', address: '5678 Wisconsin Ave NW', walkType: 'group' },
      ],
    },
    {
      time: '10:00 AM',
      duration: '30 min',
      dogs: [
        { name: 'Bella', address: '910 Connecticut Ave NW', walkType: 'group' },
      ],
    },
  ],
  '2024-04-17': [
    {
      time: '9:30 AM',
      duration: '30 min',
      dogs: [
        { name: 'Rocky', address: '910 Connecticut Ave NW', walkType: 'individual' },
      ],
    },
  ],
};

// Temporary: List of escape artist dog names (should be replaced with real data integration)
const escapeArtistNames = ['Luna'];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getScheduleForDate = (date: Date): Walk[] => {
    return mockSchedule[formatDate(date)] || [];
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Schedule</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Walk
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
            
            {selectedDate && getScheduleForDate(selectedDate).length > 0 ? (
              getScheduleForDate(selectedDate).map((walk, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: 'background.default',
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      minWidth: 100,
                      borderRight: '1px solid #eee',
                      pr: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" color="primary">
                      {walk.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walk.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {walk.dogs.map((dog, idx) => (
                      <Paper key={idx} sx={{ p: 2, minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">{dog.name}</Typography>
                          {escapeArtistNames.includes(dog.name) && (
                            <Tooltip title="Escape artist">
                              <WarningIcon color="warning" fontSize="small" />
                            </Tooltip>
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">{dog.address}</Typography>
                        <Typography variant="caption" color={dog.walkType === 'individual' ? 'primary' : 'secondary'} sx={{ mt: 1 }}>
                          {dog.walkType === 'individual' ? 'Individual Walk' : 'Group Walk'}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography color="text.secondary">
                No walks scheduled for this day
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 