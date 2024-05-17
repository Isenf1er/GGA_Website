import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Box, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const DeleteDevice = () => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch the list of devices from your API
    const fetchDevices = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/devices');
        const data = await response.json();
        setDevices(data.devices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    // Add your API call here to delete the selected device
    console.log('Selected Device:', selectedDevice);
    // Reset the form
    setSelectedDevice('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Delete Device
          </Typography>
          <Box component="form" onSubmit={handleDelete} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="device-select-label">Device</InputLabel>
              <Select
                labelId="device-select-label"
                id="device-select"
                value={selectedDevice}
                label="Device"
                onChange={(e) => setSelectedDevice(e.target.value)}
              >
                {devices.map((device) => (
                  <MenuItem key={device.id} value={device.id}>
                    {device.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: 'linear-gradient(90deg, rgba(94,82,255,1) 0%, rgba(52,211,153,1) 100%)', color: 'white' }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default DeleteDevice;
