import { useEffect, useState } from 'react';

import {
  NavigateNext,
  Refresh,
  SettingsInputAntenna,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import Item from 'antd/lib/descriptions/Item';
import Link from 'next/link';

import Meta from '../components/Meta';
import Layout from '../layouts/MainLayout';
import { getWifiInfo, getWifiNetworks, setWifiNetwork } from '../lib/py/pyapi';
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
  const [info, setInfo] = useState<{ ssid?: string; quality?: number }>({});
  const [network, setNetwork] = useState(-1);
  const [networks, setNetworks] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const loadWifiInfo = async () => {
    const i = await getWifiInfo();
    setInfo(i);

    // Select currently connected network
    if (networks.includes(i.ssid)) {
      setNetwork(networks.indexOf(i.ssid));
    }
  };

  const loadWifiNetworks = async () => {
    setIsLoading(true);
    // await pycall(`Polling for WiFi data...`);
    const list = await getWifiNetworks();
    setNetworks(list);
    // if (networks) {
    //   setNetworks(list);
    // } else {
    //   setTimeout(loadWifiNetworks, 4000);
    // }
    setIsLoading(false);
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
      console.log(response);
      // await pylog(`Connect WiFi: ${response}`);
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
        <h4 className="my-0">Wifi Setup</h4>
        {(!info && <p>Getting WiFi information...</p>) || info?.ssid ? (
          <>
            <p>You are already connected to the internet.</p>
            <p>
              Current network: {info.ssid} quality: {info.quality}
            </p>
          </>
        ) : (
          <p>
            Enter your WiFi name (SSID) and password to connect to your network.
          </p>
        )}

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={9}>
            <Item>
              {networks && (
                <Autocomplete
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
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <LoadingButton
                disabled={isConnecting}
                loading={isLoading}
                loadingPosition="start"
                sx={{ width: '100%' }}
                startIcon={<Refresh />}
                onClick={loadWifiNetworks}
                variant="outlined"
              >
                Refresh
              </LoadingButton>
            </Item>
          </Grid>

          <Grid item xs={9}>
            <Item>
              <TextField
                label="Password"
                variant="outlined"
                value={password}
                sx={{ width: '100%' }}
                type={isPasswordType ? 'password' : 'text'}
                onChange={handleInput}
              />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Button
                disabled={isLoading || isConnecting}
                variant="outlined"
                sx={{ width: '100%' }}
                startIcon={isPasswordType ? <Visibility /> : <VisibilityOff />}
                onClick={toggleShowPassword}
              >
                {isPasswordType ? 'Show' : 'Hide'}
              </Button>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
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
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Link href="/wifi" passHref>
                <Button
                  disabled={!info.ssid}
                  sx={{ width: '100%' }}
                  endIcon={<NavigateNext />}
                  variant="contained"
                >
                  Continue
                </Button>
              </Link>
            </Item>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
export default Wifi;
