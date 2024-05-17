import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Settings = ({ userProfile }) => {
  if (!userProfile) return null;

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h5">User Profile</Typography>
        <Typography>ID: {userProfile.id}</Typography>
        <Typography>Name: {userProfile.name}</Typography>
        <Typography>Email: {userProfile.email}</Typography>
        <Typography>Dark Mode: {userProfile.darkmode_flag ? 'Enabled' : 'Disabled'}</Typography>
        <Typography>Refresh Setting: {userProfile.refresh_setting}</Typography>
        <Typography>Voltage: {userProfile.voltage}</Typography>
      </Box>
    </Container>
  );
};

export default Settings;
