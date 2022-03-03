import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Grid, Button, IconButton } from '@mui/material';
import Link from 'next/link';

import Meta from '../components/Meta';
import useDevice from '../hooks/useDevice';
import useDevicePowerStatus from '../hooks/useDevicePowerStatus';
import useIp from '../hooks/useIp';
import Layout from '../layouts/MainLayout';
import { setDevicePower } from '../lib/py/pyapi';
import config from '../utils/config';

const Dashboard = () => {
  const { hwid } = useDevice();
  const { ip } = useIp();
  const { status } = useDevicePowerStatus();

  const handleClickPower = async () => {
    setDevicePower(!status);
  };

  return (
    <Layout
      meta={
        <Meta
          title={`Dashboard | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <h4>Dashboard</h4>
      <h4>Device {hwid}</h4>
      {ip && <p>IP: {ip}</p>}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={6}>
          {status ? 'ON' : 'OFF'}
          <IconButton
            color="primary"
            size="large"
            aria-label="Power on/off device"
            onClick={handleClickPower}
          >
            {status ? (
              <PowerSettingsNewIcon />
            ) : (
              <PowerSettingsNewOutlinedIcon />
            )}
          </IconButton>
        </Grid>
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
