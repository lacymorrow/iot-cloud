import { Menu, Settings, SettingsApplications, SignalWifiStatusbarConnectedNoInternet4 } from '@mui/icons-material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Grid, Button, IconButton} from '@mui/material';
import Link from 'next/link';
import style from 'styled-jsx/style';

import Meta from '../components/Meta';
import useDevice from '../hooks/useDevice';
import useDevicePowerStatus from '../hooks/useDevicePowerStatus';
import useIp from '../hooks/useIp';
import useSensor from '../hooks/useSensor';
import Layout from '../layouts/MainLayout';
import { setDevicePower } from '../lib/py/pyapi';
import config from '../utils/config';

const Dashboard = () => {
  const { hwid } = useDevice();
  const { ip } = useIp();
  const { status } = useDevicePowerStatus();
  const { temperature, humidity } = useSensor();

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >


        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={4}>
            <h4>@{hwid}</h4>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <p><em>Device is {status ? "on" : "off"}</em></p>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <h4>{status ? `Online - ${ip}` : 'Offline'}</h4>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={3} textAlign="center">
            {/* QR code button with qr icon */}
            <Link href="/settings/qr">
              <IconButton>
                <QrCode2Icon />
              </IconButton>
            </Link>

          </Grid>
          <Grid item xs={6} textAlign="center">
            {/* vertically centered container with a single columnn  */}

            <IconButton
              onClick={handleClickPower}
              color="primary"
              aria-label="power"
              size="large"
            >
              {status ? <PowerSettingsNewIcon /> : <PowerSettingsNewOutlinedIcon />}
            </IconButton>
          <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickPower}
              endIcon={status ? <PowerSettingsNewIcon /> : <PowerSettingsNewOutlinedIcon />}
            >
              {status ? 'Turn On' : 'Turn Off'}
            </Button>


          </Grid>
          <Grid item xs={3} textAlign="center">

            {/* Alert button if the user is offline (no ip) */}
            {ip ? null : (
              <Link href="/wifi">
                <IconButton>
                  <SignalWifiStatusbarConnectedNoInternet4 />
                </IconButton>
              </Link>
            )}

          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={3} textAlign="center">
            <div>
              <h4>Temperature: {temperature}</h4>
              <h4>Humidity: {humidity}</h4>
            </div>
          </Grid>
          <Grid item xs={6} textAlign="center">
              <h5>Next <b>{status ? "off" : "on"}</b> at 13:61</h5>
          </Grid>
          <Grid item xs={3} textAlign="center">
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickPower}
                endIcon={<Menu />}
              >
                Menu
            </Button>
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
