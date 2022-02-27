import useSWR from 'swr';

import { getIpAddress } from '../lib/py/pyapi';

const IpAddress = () => {
  const { data, error } = useSWR('/ip-address', async () => {
    const ipAddress = getIpAddress();

    return ipAddress;
  });

  return <p>{error ? 'Error' : data || 'loading'}</p>;
};

export default IpAddress;
