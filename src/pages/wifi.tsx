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
import useSWR from 'swr';

import Meta from '../components/Meta';
import useWifiInfo from '../hooks/useWifiInfo';
import Layout from '../layouts/MainLayout';
import {
  getIsNetworkConnected,
  getSavedNetworks,
  getWifiNetworks,
  setNewSavedNetwork,
  setWifiNetwork,
} from '../lib/py/pyapi';
import pylog from '../lib/py/pylog';
import config from '../utils/config';

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

  const { data: info, mutate, isError } = useWifiInfo();
  const { data: savedNetworks } = useSWR('/saved-networks', getSavedNetworks);

  const selectRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [network, setNetwork] = useState('');
  const [networks, setNetworks] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const loadWifiNetworks = async () => {
    setIsLoading(true);

    const list = await getWifiNetworks();
    console.log(list);
    setNetworks(list);
    setIsLoading(false);
  };

  const autofillPassword = () => {
    if (!password && info?.ssid && savedNetworks[info.ssid]) {
      // Network was previously connected, save credentials
      setPassword(savedNetworks[info.ssid]);
    }
  };

  const toggleShowPassword = () => setIsPasswordType(!isPasswordType);

  const handleInput = (event: any) => {
    setPassword(event?.target?.value);
  };

  const handleInputChange = (_event: any, newInputValue: string) => {
    setNetwork(newInputValue);
  };

  const handleSelectChange = (_event: any, ssid?: string | null) => {
    if (ssid) {
      setNetwork(ssid);
      autofillPassword();
    }
  };

  const handleSubmit = async () => {
    if (network) {
      setIsConnecting(true);
      await pylog(`WiFi Connect ${network}:${password}`);
      await setWifiNetwork(network, password)
        .then((response) => pylog(`Connect WiFi: ${response}`))
        .catch(async (error) => {
          await pylog(`WiFi Error: ${error}`);
        });
      setTimeout(() => {
        // TODO: ERROR
        getIsNetworkConnected()
          .then(async () => {
            // Save successful network connections for later
            await setNewSavedNetwork(network, password);
            console.log(`Connected, saved network${network}:${password}`);
          })
          .finally(() => {
            mutate();
            setIsConnecting(false);
            // TODO: CONFIRMATION
          });
      }, config.NETWORK_TIMEOUT);
    } else {
      // TODO: validation error
    }
  };

  useEffect(() => {
    // TODO: display network quality
    loadWifiNetworks();
  }, []);

  useEffect(() => {
    // Auto-select network
    if (!network && info?.ssid) {
      // Set to current network
      setNetwork(info.ssid);
    } else if (!network && networks && networks[0]) {
      // Set to first in list
      setNetwork(networks[0]);
    }
  }, [info, networks]);

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
        <h4
          className="my-0"
          onClick={async () => setNewSavedNetwork(network, password)}
        >
          Wifi Setup
        </h4>
        <h4
          className="my-0"
          onClick={async () => console.log(await getSavedNetworks())}
        >
          Wifi Setup
        </h4>
        {(!info && !isError && <p>Getting WiFi information...</p>) ||
        isError ? (
          <p>Enter your WiFi name (SSID) and password to connect.</p>
        ) : (
          <h3>
            {info?.ssid} {info?.quality} <WifiIcon />
          </h3>
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
                autoComplete
                autoHighlight
                // autoSelect
                clearOnEscape
                freeSolo
                openOnFocus
                ref={selectRef}
                disabled={isLoading || isConnecting}
                options={networks}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="Network" />
                )}
                inputValue={network}
                onChange={handleSelectChange}
                onBlur={autofillPassword}
                onInputChange={handleInputChange}
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
              ref={passwordRef}
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
                disabled={!info?.ssid}
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
