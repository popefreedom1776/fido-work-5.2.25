import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { Add as AddIcon } from '@mui/icons-material';

interface Walk {
  time: string;
  customer: string;
  address: string;
  duration: string;
}

interface Schedule {
  [key: string]: Walk[];
}

const mockSchedule: Schedule = {
  '2024-04-16': [
    {
      time: '9:00 AM',
      customer: 'John & Luna',
      address: '1234 Park Ave NW',
      duration: '30 min',
    },
    {
      time: '10:00 AM',
      customer: 'Sarah & Max',
      address: '5678 Wisconsin Ave NW',
      duration: '30 min',
    },
  ],
  '2024-04-17': [
    {
      time: '9:30 AM',
      customer: 'Mike & Bella',
      address: '910 Connecticut Ave NW',
      duration: '30 min',
    },
  ],
};

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
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'background.default',
                  }}
                  elevation={0}
                >
                  <Box
                    sx={{
                      minWidth: 100,
                      borderRight: '1px solid #eee',
                      pr: 2,
                    }}
                  >
                    <Typography variant="h6" color="primary">
                      {walk.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walk.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {walk.customer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {walk.address}
                    </Typography>
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