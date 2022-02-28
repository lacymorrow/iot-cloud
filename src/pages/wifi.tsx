import { useEffect, useState } from 'react';

import Meta from '../components/Meta';
import Layout from '../layouts/MainLayout';
import { getWifiInfo, getWifiNetworks } from '../lib/py/pyapi';
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
  const [info, setInfo] = useState<{ ssid: string; quality: number }>({
    ssid: '',
    quality: 0,
  });
  const [network, setNetwork] = useState('');
  const [networks, setNetworks] = useState<any[]>([]);
  const [password, setPassword] = useState('');
  const [isPasswordType, setIsPasswordType] = useState(true);

  const loadWifiInfo = async () => {
    const i = await getWifiInfo();
    setInfo(i);
    setNetwork(i.ssid);
  };

  const loadWifiNetworks = async () => {
    const list = await getWifiNetworks();
    setNetworks(list);
  };

  const toggleShowPassword = () => setIsPasswordType(!isPasswordType);

  const handleInput = (event: any) => {
    setPassword(event?.target?.value);
  };

  const handleSelectChange = (event: any) => {
    setNetwork(event.target.value);
  };

  const handleSubmit = () => {
    // await setWifiNetwork();
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
        <h4>Wifi Setup</h4>
        {info.ssid && (
          <p>
            Current network: {info.ssid} quality: {info.quality}
          </p>
        )}
        {networks && (
          <select value={network} onChange={handleSelectChange}>
            {networks.map((e: string, i: number) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        )}
        <button onClick={loadWifiNetworks}>Reload WiFi Networks</button>
        <input
          type={isPasswordType ? 'password' : 'text'}
          value={password}
          onChange={handleInput}
        />
        <button onClick={toggleShowPassword}>
          {isPasswordType ? 'Show' : 'Hide'} Password
        </button>
        <button onClick={handleSubmit}>Connect</button>
      </div>
    </Layout>
  );
};
export default Wifi;
