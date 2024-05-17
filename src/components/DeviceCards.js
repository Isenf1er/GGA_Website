import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Mock function to fetch data - replace with actual API call
const fetchData = async () => {
  return {
    averageAmperage: 60,
    device1: {
      value: 8147,
      trend: '-3%',
    },
    device2: {
      value: 29,
      trend: '-2.71%',
    },
    device3: {
      value: 17281,
      trend: '-2.84%',
    },
  };
};

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '150px',
}));

const Value = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const Trend = styled(Typography)({
  fontSize: '16px',
  color: '#4caf50',
});

const DeviceCards = () => {
  const [data, setData] = useState({
    averageAmperage: 0,
    device1: { value: 0, trend: '0%' },
    device2: { value: 0, trend: '0%' },
    device3: { value: 0, trend: '0%' },
  });

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    loadData();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h6">Amperage</Typography>
          <Value>{data.averageAmperage}V</Value>
          <Trend>-4%</Trend>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h6">Device 1</Typography>
          <Value>{data.device1.value}</Value>
          <Trend>{data.device1.trend}</Trend>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h6">Device 2</Typography>
          <Value>{data.device2.value}</Value>
          <Trend>{data.device2.trend}</Trend>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <Typography variant="h6">Device 3</Typography>
          <Value>{data.device3.value}</Value>
          <Trend>{data.device3.trend}</Trend>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DeviceCards;

/*import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '150px',
}));

const Value = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const DeviceCards = ({ userId }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`https://replica2.vercel.app/api/device_alias/${userId}`);
        const data = await response.json();
        if (data && data.devices) {
          setDevices(data.devices);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [userId]);

  return (
    <Grid container spacing={3}>
      {devices.map((device) => (
        <Grid item xs={12} sm={6} md={3} key={device.device_id}>
          <Card>
            <Typography variant="h6">{device.device_alias}</Typography>
            <Value>ID: {device.device_id}</Value>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DeviceCards;
*/