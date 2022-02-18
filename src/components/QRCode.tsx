import useSWR from 'swr';

import getHardwareId from '../lib/py/getHardwareId';

const QRCode = () => {
  const { data, error } = useSWR('qrcode', async () => getHardwareId());

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>{data}</div>;
};

export default QRCode;
