import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ToggleButton, ToggleButtonGroup, Box, Button, Grid } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend);

const DeviceCharts = ({ userId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(2);
  const [currentTimeFrame, setCurrentTimeFrame] = useState('day');
  const intervalRef = useRef(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      if (jsonData && jsonData.data && jsonData.data.length > 0) {
        return {
          labels: jsonData.data.map(item => new Date(item.timestamp).toISOString()),
          data: jsonData.data.map(item => item.data_point1),
        };
      } else {
        console.log(`No data returned for URL: ${url}`);
        return { labels: [], data: [] }; // Return an empty structure if no data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { labels: [], data: [] }; // Return an empty structure on error
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      if (!userId) return; // Safeguard against undefined userId
      try {
        const response = await fetch(`https://replica2.vercel.app/api/device_alias/${userId}`);
        const data = await response.json();
        if (data && data.devices) {
          setDevices(data.devices);
          console.log('Devices fetched:', data.devices);
        } else {
          console.log('No devices found for user:', userId);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [userId]);

  const loadChartData = async (device, timeFrame) => {
    const url = `https://replica2.vercel.app/api/v1/devices/${device}/${timeFrame}`;
    const { labels, data } = await fetchData(url);

    setChartData({
      labels,
      datasets: [
        {
          label: `Device ${device}`,
          data,
          borderColor: getRandomColor(),
          backgroundColor: 'rgba(0,0,0,0)',
          fill: false,
        },
      ],
    });
  };

  const handleToggle = (event, newTimeFrame) => {
    if (newTimeFrame && newTimeFrame !== currentTimeFrame) {
      clearInterval(intervalRef.current);
      setCurrentTimeFrame(newTimeFrame);
      loadChartData(selectedDevice, newTimeFrame);
    }
  };

  const handleDeviceChange = (device) => {
    setSelectedDevice(device);
    clearInterval(intervalRef.current);
    loadChartData(device, currentTimeFrame);
    intervalRef.current = setInterval(() => loadChartData(device, currentTimeFrame), 5000);
  };

  useEffect(() => {
    if (devices.length > 0) {
      loadChartData(selectedDevice, currentTimeFrame);
      intervalRef.current = setInterval(() => loadChartData(selectedDevice, currentTimeFrame), 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [selectedDevice, currentTimeFrame, devices]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box sx={{ width: '100%', height: '500px' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={() => handleDeviceChange(2)} style={{ marginRight: '10px' }}>
            Device 2
          </Button>
          <Button variant="contained" onClick={() => handleDeviceChange(3)}>
            Device 3
          </Button>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={currentTimeFrame}
            exclusive
            onChange={handleToggle}
            aria-label="Time Frame"
          >
            <ToggleButton value="hour">Hour</ToggleButton>
            <ToggleButton value="2hours">2 Hours</ToggleButton>
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="5days">5 Days</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </Box>
  );
};

export default DeviceCharts;



//Original
/*import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend);

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    if (jsonData && jsonData.data && jsonData.data.length > 0) {
      return {
        labels: jsonData.data.map(item => new Date(item.timestamp).toISOString()),
        data: jsonData.data.map(item => item.data_point1),
      };
    } else {
      return { labels: [], data: [] }; // Return an empty structure if no data
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { labels: [], data: [] }; // Return an empty structure on error
  }
};

const urls = {
  "hour": "https://replica2.vercel.app/api/v1/devices/2/hour",
  "2hours": "https://replica2.vercel.app/api/v1/devices/2/2hours",
  "day": "https://replica2.vercel.app/api/v1/devices/2/day",
  "5days": "https://replica2.vercel.app/api/v1/devices/2/5days",
  "month": "https://replica2.vercel.app/api/v1/devices/2/month"
};

const DeviceCharts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Data Point 1',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: true,
        tension: 0.1
      }
    ],
  });

  const [currentUrl, setCurrentUrl] = useState(urls["day"]);
  const intervalRef = useRef(null);

  const loadChartData = async (url) => {
    const { labels, data } = await fetchData(url);
    setChartData({
      labels,
      datasets: [
        {
          ...chartData.datasets[0],
          data,
        }
      ]
    });
  };

  const handleToggle = (event, newUrl) => {
    if (newUrl && newUrl !== currentUrl) {
      clearInterval(intervalRef.current);
      setCurrentUrl(newUrl);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadChartData(currentUrl);
    };

    loadData();
    intervalRef.current = setInterval(loadData, 5000);

    return () => clearInterval(intervalRef.current);
  }, [currentUrl]);

  return (
    <Box sx={{ width: '100%', height: '500px' }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <ToggleButtonGroup
          value={currentUrl}
          exclusive
          onChange={handleToggle}
          aria-label="Time Frame"
        >
          <ToggleButton value={urls["hour"]}>Hour</ToggleButton>
          <ToggleButton value={urls["2hours"]}>2 Hours</ToggleButton>
          <ToggleButton value={urls["day"]}>Day</ToggleButton>
          <ToggleButton value={urls["5days"]}>5 Days</ToggleButton>
          <ToggleButton value={urls["month"]}>Month</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </Box>
  );
};

export default DeviceCharts;
*/

//Incomplete
/*import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend);

const urls = {
  "hour": "https://replica2.vercel.app/api/v1/devices/@/hour",
  "2hours": "https://replica2.vercel.app/api/v1/devices/@/2hours",
  "day": "https://replica2.vercel.app/api/v1/devices/@/day",
  "5days": "https://replica2.vercel.app/api/v1/devices/@/5days",
  "month": "https://replica2.vercel.app/api/v1/devices/@/month"
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    if (jsonData && jsonData.data && jsonData.data.length > 0) {
      return {
        labels: jsonData.data.map(item => new Date(item.timestamp).toISOString()),
        data: jsonData.data.map(item => item.data_point1),
      };
    } else {
      console.log(`No data returned for URL: ${url}`);
      return { labels: [], data: [] }; // Return an empty structure if no data
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { labels: [], data: [] }; // Return an empty structure on error
  }
};

const DeviceCharts = ({ userId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [devices, setDevices] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(urls["day"]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`https://replica2.vercel.app/api/device_alias/${userId}`);
        const data = await response.json();
        if (data && data.devices) {
          setDevices(data.devices);
          console.log('Devices fetched:', data.devices);
        } else {
          console.log('No devices found for user:', userId);
        }
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [userId]);

  const loadChartData = async (urlTemplate) => {
    const datasets = await Promise.all(
      devices.map(async (device) => {
        const url = urlTemplate.replace('@', device.device_id);
        const { labels, data } = await fetchData(url);
        console.log(`Data fetched for device ${device.device_id}:`, { labels, data });
        return {
          label: device.device_alias,
          data,
          borderColor: getRandomColor(),
          backgroundColor: 'rgba(0,0,0,0)',
          fill: false,
        };
      })
    );

    setChartData({
      labels: datasets[0]?.labels || [],
      datasets,
    });
  };

  const handleToggle = (event, newUrl) => {
    if (newUrl && newUrl !== currentUrl) {
      clearInterval(intervalRef.current);
      setCurrentUrl(newUrl);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadChartData(currentUrl);
    };

    if (devices.length > 0) {
      loadData();
      intervalRef.current = setInterval(loadData, 5000);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentUrl, devices]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box sx={{ width: '100%', height: '500px' }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <ToggleButtonGroup
          value={currentUrl}
          exclusive
          onChange={handleToggle}
          aria-label="Time Frame"
        >
          <ToggleButton value={urls["hour"]}>Hour</ToggleButton>
          <ToggleButton value={urls["2hours"]}>2 Hours</ToggleButton>
          <ToggleButton value={urls["day"]}>Day</ToggleButton>
          <ToggleButton value={urls["5days"]}>5 Days</ToggleButton>
          <ToggleButton value={urls["month"]}>Month</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </Box>
  );
};

export default DeviceCharts;
*/