import { QrCode2, SignalWifiBadTwoTone } from '@mui/icons-material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Button, Grid, IconButton } from '@mui/material';
import Link from 'next/link';

import Meta from '../components/Meta';
import useDevice from '../hooks/useDevice';
import useDevicePowerStatus from '../hooks/useDevicePowerStatus';
import useIp from '../hooks/useIp';
import useSensor from '../hooks/useSensor';
import Layout from '../layouts/MainLayout';
import { setDevicePower } from '../lib/py/pyapi';
import config from '../utils/config';

const Dashboard = () => {
  const { data: tempHum } = useSensor();
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
      <Meta
        title={`Dashboard | ${config.title}: ${config.tagline}`}
        description={config.description}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4} textAlign="center">
            <h3>{hwid || 'Device'}</h3>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <p>Device is {status ? 'on' : 'off'}</p>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <h3>{(ip && `Online ${ip}`) || 'Offline'}</h3>
          </Grid>
        </Grid>

        {/* QR Button, Power button, Wifi Disconnected button */}
        <Grid container spacing={2}>
          <Grid item xs={4} textAlign="center">
            <Link href="/settings/view-qr" passHref>
              <IconButton color="primary" aria-label="qr code">
                <QrCode2 />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <IconButton
              color="primary"
              aria-label="power"
              onClick={handleClickPower}
            >
              {status ? (
                <PowerSettingsNewIcon />
              ) : (
                <PowerSettingsNewOutlinedIcon />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={4} textAlign="center">
            {ip && (
              <IconButton color="primary" aria-label="qr code">
                <SignalWifiBadTwoTone />
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <p>
              {tempHum}
              Humidity: <span>0</span>
              <br />
              Temperature: <span>0</span> C
            </p>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button color="primary">Menu</Button>
          </Grid>
        </Grid>
      </div>
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
