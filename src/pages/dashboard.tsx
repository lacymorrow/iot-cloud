import { Grid, Button } from '@mui/material';
import Link from 'next/link';

import Meta from '../components/Meta';
import useDevice from '../components/useDevice';
import useNetwork from '../components/useNetwork';
import Layout from '../layouts/MainLayout';
import config from '../utils/config';

const Dashboard = () => {
  const { hwid } = useDevice();
  const { data: ip } = useNetwork();
  return (
    <Layout
      meta={
        <Meta
          title={`Dashboard | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h1>Dashboard</h1>
      <h3>Device Name</h3>
      <h4>Device {hwid}</h4>
      {ip && <p>IP: {ip}</p>}
      <button>Toggle On/Off</button>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          <Link href="/wifi" passHref>
            <Button sx={{ width: '100%' }} variant="contained">
              WiFi
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="/settings/about" passHref>
            <Button sx={{ width: '100%' }} variant="outlined">
              About
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link href="/settings/view-qr" passHref>
            <Button sx={{ width: '100%' }} variant="outlined">
              View QR
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* control
			- on/off
			- Sensor readout
			- upcoming schedule
			- View QR

		Settings
			- wifi
			- device
		- about
		- Pairing */}
    </Layout>
  );
};

export default Dashboard;
