import { useEffect, useState } from 'react';

import Meta from '../components/Meta';
import Layout from '../layouts/MainLayout';
import { getWifiNetworks } from '../lib/py/pyapi';
import config from '../utils/config';

const Wifi = () => {
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getWifiNetworks();
      setNetworks(list);
    })();
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
        {networks && (
          <select>
            {networks.map((e: string, i: number) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        )}
      </div>
    </Layout>
  );
};
export default Wifi;
