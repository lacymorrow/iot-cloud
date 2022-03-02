import { useEffect, useRef, useState } from 'react';

import {
  NavigateNext,
  Refresh,
  SettingsInputAntenna,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import WifiIcon from '@mui/icons-material/Wifi';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import Link from 'next/link';

import Meta from '../components/Meta';
import Layout from '../layouts/MainLayout';
import { getWifiInfo, getWifiNetworks, setWifiNetwork } from '../lib/py/pyapi';
import pylog from '../lib/py/pylog';
import config from '../utils/config';

// interface Option<T> {
//   key: string;
//   value: T;
//   label: string;
// }

const Wifi = () => {
  // const [state, setState] = useReducer<Reducer<StateType, Partial<StateType>>>(
  //   (currentState, newState) => ({ ...currentState, ...newState }),
  //   {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     message: '',
  //   }
  // );

  // const handleChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setState({ [name]: value });

  //   // setState((prevState) => ({
  //   //   ...prevState,
  //   //   [name]: value,
  //   // }));
  // };
  const selectRef = useRef<HTMLSelectElement>(null);
  const [info, setInfo] = useState<{ ssid?: string; quality?: number }>({});
  const [network, setNetwork] = useState(-1);
  const [networks, setNetworks] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const syncNetworks = () => {
    // Select currently connected network
    if (info.ssid && networks.includes(info.ssid)) {
      setNetwork(networks.indexOf(info.ssid));
    }
  };

  const loadWifiNetworks = async () => {
    setIsLoading(true);

    const list = await getWifiNetworks();
    setNetworks(list);

    setIsLoading(false);
    syncNetworks();
    selectRef.current?.focus();
  };

  const loadWifiInfo = async () => {
    const i = await getWifiInfo();
    setInfo(i);
    syncNetworks();
  };

  const toggleShowPassword = () => setIsPasswordType(!isPasswordType);

  const handleInput = (event: any) => {
    setPassword(event?.target?.value);
  };

  const handleSelectChange = (event: any) => {
    setNetwork(event.target.value);
  };

  const handleSubmit = async () => {
    setIsConnecting(true);
    const ssid = networks[network];
    if (ssid) {
      const response = await setWifiNetwork(ssid, password);
      await pylog(`Connect WiFi: ${response}`);
    }
    setIsConnecting(false);
  };

  useEffect(() => {
    loadWifiInfo();
    loadWifiNetworks();
  }, []);

  return (
    <Layout
      meta={
        <Meta
          title={`Wifi | ${config.title}: ${config.tagline}`}
          description={config.description}
        />
      }
    >
      <div className="block text-center ">
        <h4 className="my-0" onClick={loadWifiInfo}>
          Wifi Setup
        </h4>
        {(!info && <p>Getting WiFi information...</p>) || info?.ssid ? (
          <>
            <h3>
              {info.ssid} {info.quality} <WifiIcon />
            </h3>
          </>
        ) : (
          <p>Enter your WiFi name (SSID) and password to connect.</p>
        )}

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            {networks && (
              <Autocomplete
                ref={selectRef}
                disablePortal
                disabled={isLoading || isConnecting}
                options={networks}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Network" />
                )}
                onChange={handleSelectChange}
              />
            )}
          </Grid>
          <Grid item xs={3}>
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              sx={{ width: '100%' }}
              startIcon={<Refresh />}
              onClick={loadWifiNetworks}
              variant="outlined"
            >
              Refresh
            </LoadingButton>
          </Grid>

          <Grid item xs={9}>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              sx={{ width: '100%' }}
              type={isPasswordType ? 'password' : 'text'}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              sx={{ width: '100%' }}
              startIcon={isPasswordType ? <Visibility /> : <VisibilityOff />}
              onClick={toggleShowPassword}
            >
              {isPasswordType ? 'Show' : 'Hide'}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <LoadingButton
              loading={isLoading || isConnecting}
              loadingPosition="end"
              sx={{ width: '100%' }}
              endIcon={<SettingsInputAntenna />}
              variant="contained"
              onClick={handleSubmit}
            >
              Connect
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <Link href="/dashboard" passHref>
              <Button
                disabled={!info.ssid}
                sx={{ width: '100%' }}
                endIcon={<NavigateNext />}
                variant="contained"
              >
                Done
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
export default Wifi;
