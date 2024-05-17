import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const AddNewDevice = ({ userId, onDeviceAdded }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceConnectionString, setDeviceConnectionString] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const url = `https://replica2.vercel.app/api/device_alias/create_device/${userId}/${deviceConnectionString}/${deviceName}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.msg === 'Device created successfully') {
        onDeviceAdded(); // Callback to notify parent component
        setDeviceName('');
        setDeviceConnectionString('');
      } else {
        setError(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
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
            Add Device
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="deviceName"
              label="Device Name"
              name="deviceName"
              autoComplete="device-name"
              autoFocus
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="deviceConnectionString"
              label="Device Connection String"
              type="text"
              id="deviceConnectionString"
              autoComplete="device-connection-string"
              value={deviceConnectionString}
              onChange={(e) => setDeviceConnectionString(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: 'linear-gradient(90deg, rgba(94,82,255,1) 0%, rgba(52,211,153,1) 100%)', color: 'white' }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddNewDevice;

/*import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const AddNewDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceConnectionString, setDeviceConnectionString] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your API call here to submit the device details
    console.log('Device Name:', deviceName);
    console.log('Device Connection String:', deviceConnectionString);
    // Reset the form
    setDeviceName('');
    setDeviceConnectionString('');
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
            Add Device
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="deviceName"
              label="Device Name"
              name="deviceName"
              autoComplete="device-name"
              autoFocus
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="deviceConnectionString"
              label="Device Connection String"
              type="text"
              id="deviceConnectionString"
              autoComplete="device-connection-string"
              value={deviceConnectionString}
              onChange={(e) => setDeviceConnectionString(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: 'linear-gradient(90deg, rgba(94,82,255,1) 0%, rgba(52,211,153,1) 100%)', color: 'white' }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddNewDevice;
*/