import { useState } from 'react';

import { Button } from 'antd';

import getHardwareId from '../lib/py/getHardwareId';

const QrCode = () => {
  const [id, setId] = useState('none');
  const [log, setlog] = useState('');

  const onReload = async () => {
    const hwid = await getHardwareId();
    setlog(`${log}id${hwid}`);
    setId(hwid);
  };

  return (
    <div>
      <h1>{id}</h1>
      <Button onClick={onReload}>Reload</Button>
      <p>{log}</p>
    </div>
  );
};

export default QrCode;
