import { useState, useEffect } from 'react';

import { Button } from 'antd';
import useSWR from 'swr';

import getHardwareId from '../lib/py/getHardwareId';

const QRCode = () => {
  const { data, error } = useSWR('qrcode', async () => getHardwareId());
  const [id, setId] = useState('');

  const onReload = async () => {
    const hwid = await getHardwareId();
    setId(hwid);
  };

  useEffect(onReload, [id]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <h1>{data}</h1>
      <h1>{id}</h1>
      <Button onClick={onReload}>Reload</Button>
    </div>
  );
};

export default QRCode;
